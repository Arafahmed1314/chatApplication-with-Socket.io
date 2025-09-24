import React from "react";

export default function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("user"));
  const itsme = message?.sender === authUser.user._id;
  // console.log(message.sender, authUser.user._id);

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
      </div>
    </div>
  );
}
