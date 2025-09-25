import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import API_BASE_URL from "../config/api.js";
function GetAllUsers() {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/users/getuserprofile`,
          {
            withCredentials: true,
          }
        );
        setAllUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return { allUser, loading };
}
export default GetAllUsers;
