import axios from "axios";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Cookies from "js-cookie";

export default function Logout() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // Clear all auth data
      localStorage.removeItem("user");
      Cookies.remove("user");
      setAuthUser(null);
      navigate("/chat");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if server logout fails, clear local auth
      localStorage.removeItem("user");
      Cookies.remove("user");
      setAuthUser(null);
      navigate("/chat");
    }
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
