import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function MessageInput() {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="p-6 border-t border-slate-600">
      <form onSubmit={handleSend} className="flex items-center space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-200"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-all duration-200 disabled:opacity-50"
          disabled={!message.trim()}
        >
          <IoSend className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
