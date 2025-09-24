import { useState } from 'react'
import useConversation from '../stateManage/useConversation.js';
import axios from 'axios';

export default function useSendMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (messageText) => {
        if (!selectedConversation || !messageText.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:5000/messages/send/${selectedConversation._id}`, {
                message: messageText,
            }, {
                withCredentials: true
            });

            console.log("Send message response:", response.data);

            // Add the new message to the existing messages
            if (response.data.newMessage) {
                setMessages([...messages, response.data.newMessage]);
            }

        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
}
