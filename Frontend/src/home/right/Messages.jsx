import Message from "./Message";
import MessageSkeleton from "../../components/MessageSkeleton";
import useGetMessage from "../../context/useGetMessage";
import { useEffect, useRef } from "react";
import useGetSocketMessage from "../../context/useGetSocketMessage";

export default function Messages() {
  const { messages, loading } = useGetMessage();
  console.log(messages, loading);
  useGetSocketMessage();
  const lastMessageRef = useRef();
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (loading) {
    return <MessageSkeleton />;
  }

  return (
    <div className="h-full pb-4 px-4">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        // Fallback when no messages or messages is not an array
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">
            No messages yet. Start a conversation!
          </p>
        </div>
      )}
    </div>
  );
}
