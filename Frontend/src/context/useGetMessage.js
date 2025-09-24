import React, { useEffect, useState } from 'react'
import useConversation from '../stateManage/useConversation';
import axios from 'axios';

export default function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    // Fetch messages when selectedConversation changes
    console.log(selectedConversation);

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation) return;
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/messages/get/${selectedConversation._id}`, {
                    withCredentials: true
                });
                console.log("API response:", response.data);

                // Ensure messages is always an array
                const messagesData = response.data.messages;
                if (Array.isArray(messagesData)) {
                    setMessages(messagesData);
                } else {
                    console.warn("Messages is not an array:", messagesData);
                    setMessages([]); // Fallback to empty array
                }

            } catch (error) {
                console.error("Failed to fetch messages:", error);
                setMessages([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        }
        getMessages();
    }, [selectedConversation, setMessages])
    return (
        { messages, loading }
    )
}
