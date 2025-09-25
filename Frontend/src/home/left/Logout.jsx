import axios from "axios";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      toast.success("Successfully logged out. See you soon!", {
        icon: "👋",
      });
      navigate("/chat");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if server logout fails, clear local auth
      localStorage.removeItem("user");
      Cookies.remove("user");
      setAuthUser(null);
      toast.success("Successfully logged out. See you soon!", {
        icon: "👋",
      });
      navigate("/chat");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <button
        onClick={handleLogout}
        className="flex items-center justify-center space-x-3 w-full p-3 md:p-4 text-gray-300 hover:text-white bg-gradient-to-r from-red-600/10 to-red-700/10 hover:from-red-600/20 hover:to-red-700/20 border border-red-600/20 hover:border-red-500/40 transition-all duration-300 rounded-xl group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <BiLogOut className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300 relative z-10" />
        <span className="font-medium relative z-10">Logout</span>
      </button>
    </div>
  );
}
