import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

export default function Left() {
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-black text-gray-300 flex flex-col h-full">
      <h1 className="font-bold text-2xl md:text-3xl p-2 ml-2">Chat</h1>
      <Search />
      <hr className="my-4" />
      <div className="flex-1 overflow-hidden">
        <Users />
      </div>
      <div className="mt-auto">
        <Logout />
      </div>
    </div>
  );
}
