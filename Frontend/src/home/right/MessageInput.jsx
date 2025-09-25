import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage";

export default function MessageInput() {
  const { sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageToSend = message;
      setMessage(""); // Clear input immediately
      await sendMessage(messageToSend);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <form onSubmit={handleSend} className="flex items-end space-x-3 relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>

        <div className="flex-1 relative group">
          {/* Emoji button */}
          <button
            type="button"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-600/50 rounded-full transition-colors z-10"
          >
            <svg
              className="w-5 h-5 text-gray-400 hover:text-yellow-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full pl-12 pr-12 py-4 bg-slate-700/80 border border-slate-600/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:bg-slate-600/80 transition-all duration-300 backdrop-blur-sm resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />

          {/* Attachment button */}
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-600/50 rounded-full transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
        </div>

        <button
          type="submit"
          className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-2xl text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25 group relative overflow-hidden"
          disabled={!message.trim()}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <IoSend className="w-5 h-5 relative z-10 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </form>
    </div>
  );
}
