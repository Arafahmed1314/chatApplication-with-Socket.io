import React from "react";
import { HiStatusOnline } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
import useConversation from "../../stateManage/useConversation";
import Avatar from "../../components/Avatar.jsx";

export default function Chatuser({ selectedConversation }) {
  const { setSelectedConversation } = useConversation();

  const handleBackClick = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="flex items-center justify-between p-4 md:p-6">
      <div className="flex items-center space-x-4">
        {/* Back button - only visible on mobile */}
        <button
          onClick={handleBackClick}
          className="md:hidden p-2 hover:bg-slate-700/50 rounded-full transition-colors duration-200 group"
        >
          <IoArrowBack className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
        </button>
        <Avatar
          name={selectedConversation?.fullname}
          size="lg"
          isOnline={true}
          showOnlineIndicator={true}
          className="group"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white text-lg truncate">
            {selectedConversation?.fullname}
          </h3>
          <div className="flex items-center text-sm text-green-400">
            <HiStatusOnline className="w-3 h-3 mr-1 animate-pulse" />
            <span className="font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-slate-700/50 rounded-full transition-colors duration-200 group">
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-slate-700/50 rounded-full transition-colors duration-200 group">
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
