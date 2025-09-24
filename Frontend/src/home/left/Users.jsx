import React from "react";
import User from "./User";
import GetAllUsers from "../../context/GetAllUsers";
import Loading from "../../components/Loading";

export default function Users() {
  const { allUser, loading } = GetAllUsers();
  console.log(allUser);

  return (
    <div className="h-full overflow-y-auto hide-scrollbar">
      {loading ? (
        <Loading />
      ) : (
        allUser.map((user) => <User key={user._id} user={user} />)
      )}
    </div>
  );
}
