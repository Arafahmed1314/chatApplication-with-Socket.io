import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../stateManage/useConversation";

export default function Right() {
  const { selectedConversation } = useConversation();

  if (!selectedConversation) {
    return (
      <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 text-white flex flex-col h-full justify-center items-center">
        <div className="text-center space-y-4 p-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-200">
            Welcome to Chat
          </h3>
          <p className="text-gray-400 max-w-md">
            Select a conversation from the sidebar to start chatting with your
            friends.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 text-white flex flex-col h-full">
      {/* Chat header with better styling */}
      <div className="border-b border-slate-700/80 bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm">
        <Chatuser selectedConversation={selectedConversation} />
      </div>

      {/* Messages area with subtle background pattern */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="h-full overflow-y-auto custom-scrollbar">
          <Messages />
        </div>
      </div>

      {/* Message input with better styling */}
      <div className="border-t border-slate-700/80 bg-gradient-to-r from-slate-800/90 to-slate-700/90 backdrop-blur-sm">
        <MessageInput />
      </div>
    </div>
  );
}
