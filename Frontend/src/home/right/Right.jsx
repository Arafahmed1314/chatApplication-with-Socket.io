import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../stateManage/useConversation";

export default function Right() {
  const { selectedConversation } = useConversation();
  return (
    <div className="w-full md:w-2/3 lg:w-3/4 bg-slate-800 text-white flex flex-col h-full">
      <Chatuser selectedConversation={selectedConversation} />
      <hr className="border-slate-600" />
      <div className="flex-1 overflow-hidden">
        <Messages />
      </div>
      <MessageInput />
    </div>
  );
}
