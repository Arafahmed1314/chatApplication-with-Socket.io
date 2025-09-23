import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
function GetAllUsers() {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          "http://localhost:5000/users/getuserprofile",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
