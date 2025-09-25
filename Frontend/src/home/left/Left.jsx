import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

export default function Left() {
  return (
    <div className="w-full bg-gradient-to-b from-slate-900 to-slate-800 text-gray-100 flex flex-col h-full border-r border-slate-700/50 backdrop-blur-xl">
      {/* Header with gradient and better spacing */}
      <div className="p-4 md:p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-700/80">
        <h1 className="font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Chat
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Stay connected with friends
        </p>
      </div>

      {/* Search with better padding */}
      <div className="p-3 md:p-4">
        <Search />
      </div>

      {/* Subtle divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent mx-4"></div>

      {/* Users list with better scrolling */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <Users />
        </div>
      </div>

      {/* Logout button with better styling */}
      <div className="mt-auto border-t border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-700/80">
        <Logout />
      </div>
    </div>
  );
}
