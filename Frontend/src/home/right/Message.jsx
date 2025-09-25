import React from "react";
import Avatar from "../../components/Avatar.jsx";
import useConversation from "../../stateManage/useConversation";

export default function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("user"));
  const { selectedConversation } = useConversation();
  const itsme = message?.sender === authUser.user._id;
  const createAt = new Date(message?.createdAt);
  const formattedTime = createAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="px-4 md:px-6 py-2 group hover:bg-slate-800/30 transition-colors duration-200">
      <div
        className={`flex ${
          itsme ? "justify-end" : "justify-start"
        } items-end space-x-2`}
      >
        {/* Avatar for received messages */}
        {!itsme && (
          <Avatar
            name={selectedConversation?.fullname}
            size="sm"
            className="flex-shrink-0 mb-1"
          />
        )}

        <div
          className={`max-w-xs md:max-w-md lg:max-w-lg ${
            itsme ? "order-last" : ""
          }`}
        >
          {/* Message bubble */}
          <div
            className={`relative px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl ${
              itsme
                ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white ml-auto rounded-br-md"
                : "bg-gradient-to-br from-slate-700 to-slate-600 text-gray-100 mr-auto rounded-bl-md"
            } ${
              message?.isPending ? "opacity-70 animate-pulse" : "opacity-100"
            }`}
          >
            {/* Message text */}
            <p className="text-sm md:text-base leading-relaxed break-words">
              {message?.message}
            </p>

            {/* Message tail */}
            <div
              className={`absolute bottom-0 w-3 h-3 ${
                itsme
                  ? "right-0 bg-gradient-to-br from-blue-600 to-blue-700 transform rotate-45 translate-x-1/2 translate-y-1/2"
                  : "left-0 bg-gradient-to-br from-slate-700 to-slate-600 transform rotate-45 -translate-x-1/2 translate-y-1/2"
              }`}
            ></div>
          </div>

          {/* Timestamp and status */}
          <div
            className={`flex items-center gap-2 mt-1 px-2 ${
              itsme ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-xs text-gray-400 font-medium">
              {formattedTime}
            </span>
            {message?.isPending && (
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-400">Sending...</span>
              </div>
            )}
            {itsme && !message?.isPending && (
              <svg
                className="w-4 h-4 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Avatar for sent messages */}
        {itsme && (
          <Avatar
            name={authUser.user.fullname}
            size="sm"
            className="flex-shrink-0 mb-1"
          />
        )}
      </div>
    </div>
  );
}
