import { Input } from "../../../components/ui/input";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="bg-white border-b border-slate-400  flex items-center gap-x-2 p-2">
      <Input
        type="text"
        className="bg-slate-200"
        placeholder="search for a user..."
      />
      <FaSearch className="w-8 h-8 p-1" />
    </div>
  );
};

export default SearchBar;
