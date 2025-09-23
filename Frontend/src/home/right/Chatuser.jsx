import React from "react";
import { HiStatusOnline } from "react-icons/hi";

export default function Chatuser() {
  return (
    <div className="flex items-center space-x-4 p-6">
      <div className="relative">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
      </div>
      <div>
        <h3 className="font-medium text-white">Araf Ahmed</h3>
        <div className="flex items-center text-sm text-green-400">
          <HiStatusOnline className="w-3 h-3 mr-1" />
          <span>Online</span>
        </div>
      </div>
    </div>
  );
}
