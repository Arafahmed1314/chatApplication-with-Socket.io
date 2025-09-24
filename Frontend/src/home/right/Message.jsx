import React from "react";

export default function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("user"));
  const itsme = message?.sender === authUser.user._id;
  const createAt = new Date(message?.createdAt);
  const formattedTime = createAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="px-6 py-3">
      <div className={`chat ${itsme ? "chat-end" : "chat-start"}`}>
        <div
          className={`chat-bubble ${
            itsme ? "chat-bubble-primary" : "chat-bubble-accent"
          } text-sm md:text-base`}
        >
          {message?.message}
        </div>
        <div className="text-xs text-gray-500">{formattedTime}</div>
      </div>
    </div>
  );
}
