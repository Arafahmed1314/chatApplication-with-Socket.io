import { IoSearch } from "react-icons/io5";
import useConversation from "../../stateManage/useConversation";

export default function Search() {
  const { searchTerm, setSearchTerm } = useConversation();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-focus-within:blur-lg transition-all duration-300 opacity-0 group-focus-within:opacity-100"></div>
      <div className="relative">
        <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 w-5 h-5 transition-colors duration-200" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search conversations..."
          className="w-full pl-12 pr-4 py-3.5 bg-slate-800/80 border border-slate-600/50 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
