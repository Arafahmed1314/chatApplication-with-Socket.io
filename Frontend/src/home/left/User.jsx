import React from "react";
import useConversation from "../../stateManage/useConversation.js";
import { useSocket } from "../../context/SocketContext.jsx";

export default function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocket();
  const isOnline = onlineUsers?.includes(user._id);
  console.log(isOnline);

  return (
    <div
      className={isSelected ? "bg-slate-700 rounded-sm" : ""}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="px-6 space-x-4 hover:bg-slate-600 duration-500   flex py-3">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-16 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
          </div>
        </div>
        <div>
          {" "}
          <h1 className="font-bold">{user?.fullname}</h1>
          <span>{user?.email}</span>
        </div>
      </div>
    </div>
  );
}
