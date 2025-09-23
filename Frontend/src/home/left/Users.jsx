import React from "react";
import User from "./User";
import GetAllUsers from "../../context/GetAllUsers";

export default function Users() {
  const { allUser, loading } = GetAllUsers();
  console.log(allUser);

  return (
    <div className="h-full overflow-y-auto hide-scrollbar">
      {loading ? (
        <p>Loading...</p>
      ) : (
        allUser.map((user) => <User key={user.id} user={user} />)
      )}
    </div>
  );
}
