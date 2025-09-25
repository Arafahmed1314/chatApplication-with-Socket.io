
import { useSocket } from './SocketContext'
import useConversation from '../stateManage/useConversation';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import sound from './noti.mp3'
export default function useGetSocketMessage() {
    const { socket } = useSocket();
    const { setMessages, selectedConversation } = useConversation();
    const { authUser } = useAuth();

    useEffect(() => {
        if (!socket) return;
        socket.on("newMessage", (newMessage) => {
            const notificationSound = new Audio(sound);
            notificationSound.play();

            // Only add message if it belongs to the currently selected conversation
            if (selectedConversation && authUser) {
                const currentUserId = authUser.user._id;
                const selectedUserId = selectedConversation._id;

                const isMessageForThisConversation =
                    (newMessage.sender === currentUserId && newMessage.receiver === selectedUserId) ||
                    (newMessage.sender === selectedUserId && newMessage.receiver === currentUserId);

                if (isMessageForThisConversation) {
                    setMessages((prevMessages) => {
                        // Check if message already exists to avoid duplicates
                        const messageExists = prevMessages.some(msg => msg._id === newMessage._id);
                        if (messageExists) return prevMessages;

                        return [...prevMessages, newMessage];
                    });
                }
            }
        });
        return () => {
            socket.off("newMessage");
        }
    }, [socket, setMessages, selectedConversation, authUser]);
}
