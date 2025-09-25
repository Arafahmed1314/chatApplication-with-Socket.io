import React from "react";
import useConversation from "../../stateManage/useConversation.js";
import { useSocket } from "../../context/SocketContext.jsx";
import Avatar from "../../components/Avatar.jsx";

export default function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocket();
  const isOnline = onlineUsers?.includes(user._id);

  return (
    <div
      className={`mx-2 my-1 rounded-xl cursor-pointer transition-all duration-300 relative group ${
        isSelected
          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg"
          : "hover:bg-slate-700/50 hover:shadow-md"
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
      )}

      <div className="px-4 py-3 flex items-center space-x-3">
        {/* Avatar with online status */}
        <Avatar
          name={user?.fullname}
          size="md"
          isOnline={isOnline}
          showOnlineIndicator={true}
          className="flex-shrink-0"
        />

        {/* User info */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-sm truncate transition-colors duration-200 ${
              isSelected ? "text-white" : "text-gray-200 group-hover:text-white"
            }`}
          >
            {user?.fullname}
          </h3>
          <p
            className={`text-xs truncate transition-colors duration-200 ${
              isSelected
                ? "text-blue-200"
                : "text-gray-400 group-hover:text-gray-300"
            }`}
          >
            {isOnline ? "Online" : "Offline"} • {user?.email}
          </p>
        </div>

        {/* Unread indicator (placeholder) */}
        <div className="flex-shrink-0">
          {isSelected && (
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
