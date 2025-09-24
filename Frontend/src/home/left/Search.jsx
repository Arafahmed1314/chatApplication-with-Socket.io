import { IoSearch } from "react-icons/io5";
import useConversation from "../../stateManage/useConversation";

export default function Search() {
  const { searchTerm, setSearchTerm } = useConversation();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="px-2">
      <div className="relative">
        <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search conversations..."
          className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:text-black focus:bg-white transition-all duration-200"
        />
      </div>
    </div>
  );
}
