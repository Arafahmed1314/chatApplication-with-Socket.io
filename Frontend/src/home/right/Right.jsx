import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

export default function Right() {
  return (
    <div className="w-full md:w-2/3 lg:w-3/4 bg-slate-800 text-white flex flex-col h-full">
      <Chatuser />
      <hr className="border-slate-600" />
      <div className="flex-1 overflow-hidden">
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
}
