import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
const SocketContext = createContext();

function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: { userId: authUser.user._id },
      });
      setSocket(newSocket);
      console.log("Socket connected");

      // Listen for online users updates
      newSocket.on("getonline", (users) => {
        console.log("Online users:", users);
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      // Clean up when user logs out
      if (socket) {
        socket.close();
        setSocket(null);
      }
      setOnlineUsers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, setSocket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}
export const useSocket = () => {
  return useContext(SocketContext);
};
export default SocketProvider;
