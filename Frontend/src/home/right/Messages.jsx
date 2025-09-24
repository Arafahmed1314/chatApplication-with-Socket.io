import Message from "./Message";
import MessageSkeleton from "../../components/MessageSkeleton";
import useGetMessage from "../../context/useGetMessage";

export default function Messages() {
  const { messages, loading } = useGetMessage();
  console.log(messages, loading);

  if (loading) {
    return <MessageSkeleton />;
  }

  return (
    <div className="h-full overflow-y-auto hide-scrollbar pb-4">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message) => (
          <Message key={message._id} message={message} />
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
