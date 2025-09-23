import React from "react";
import { BiLogOut } from "react-icons/bi";

export default function Logout() {
  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-3 w-full p-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200 rounded-lg m-2"
    >
      <BiLogOut className="w-5 h-5" />
      <span className="font-medium">Logout</span>
    </button>
  );
}
