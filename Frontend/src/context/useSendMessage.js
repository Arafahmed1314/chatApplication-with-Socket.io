import { useState } from 'react'
import { toast } from 'react-toastify';
import useConversation from '../stateManage/useConversation.js';
import { useAuth } from './AuthProvider.jsx';
import axios from 'axios';

export default function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuth();

    const sendMessage = async (messageText) => {
        if (!selectedConversation || !messageText.trim() || !authUser) return;

        const tempId = `temp_${Date.now()}_${Math.random()}`;
        const optimisticMessage = {
            _id: tempId,
            sender: authUser.user._id,
            receiver: selectedConversation._id,
            message: messageText,
            createdAt: new Date().toISOString(),
            isPending: true // Flag to show this is a temporary message
        };

        // Immediately add the message to UI (optimistic update)
        setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:5000/messages/send/${selectedConversation._id}`, {
                message: messageText,
            }, {
                withCredentials: true
            });

            // Replace the temporary message with the real one from server
            if (response.data.newMessage) {
                setMessages((prevMessages) =>
                    prevMessages.map(msg =>
                        msg._id === tempId ? response.data.newMessage : msg
                    )
                );
            }

        } catch (error) {
            console.error("Failed to send message:", error);
            // Remove the failed message from UI
            setMessages((prevMessages) =>
                prevMessages.filter(msg => msg._id !== tempId)
            );
            // Show error toast
            toast.error("Failed to send message. Please try again.", {
                icon: "📤"
            });
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
}
