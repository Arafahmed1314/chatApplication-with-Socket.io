
import { useSocket } from './SocketContext'
import useConversation from '../stateManage/useConversation';
import { useEffect } from 'react';
import sound from './noti.mp3'
export default function useGetSocketMessage() {
    const { socket } = useSocket();
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        if (!socket) return;
        socket.on("newMessage", (newMessage) => {
            const notificationSound = new Audio(sound);
            notificationSound.play();
            console.log("Received new message via socket:", newMessage);

            // Only add message if it belongs to the currently selected conversation
            if (selectedConversation &&
                (newMessage.sender === selectedConversation._id ||
                    newMessage.receiver === selectedConversation._id)) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });
        return () => {
            socket.off("newMessage");
        }
    }, [socket, messages, setMessages, selectedConversation]);
}
