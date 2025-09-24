import React from "react";
import User from "./User";
import GetAllUsers from "../../context/GetAllUsers";
import Loading from "../../components/Loading";
import useConversation from "../../stateManage/useConversation";

export default function Users() {
  const { allUser, loading } = GetAllUsers();
  const { searchTerm } = useConversation();

  // Filter users based on search term
  const filteredUsers = allUser.filter((user) => {
    if (!searchTerm.trim()) return true; // Show all users if no search term
    return user.fullname.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="h-full overflow-y-auto hide-scrollbar">
      {loading ? (
        <Loading />
      ) : filteredUsers.length > 0 ? (
        filteredUsers.map((user) => <User key={user._id} user={user} />)
      ) : (
        <div className="flex items-center justify-center h-32">
          <p className="text-gray-500 text-center">
            {searchTerm.trim() ? "No users found" : "No users available"}
          </p>
        </div>
      )}
    </div>
  );
}
