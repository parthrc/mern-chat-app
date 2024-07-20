import { Input } from "../../../components/ui/input";
import { FaSearch } from "react-icons/fa";
import useSearchUsers from "../../../hooks/useSearchUsers";
import { useState } from "react";
import { UserObject } from "../../../types/api.types";

const SearchBar = () => {
  const { searchUsersApi, isLoading } = useSearchUsers();
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<UserObject[] | null>(null);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setUsers(null);
      return;
    }

    const res = await searchUsersApi(value);
    setUsers(res.data);
  };

  return (
    <div className="relative">
      <div className="bg-white border-b border-slate-400 flex items-center gap-x-2 p-2">
        <Input
          type="text"
          className="bg-slate-200"
          placeholder="search for a user..."
          value={searchText}
          onChange={handleInputChange}
        />
        <FaSearch className="w-8 h-8 p-1" />
      </div>
      {users ? (
        <div className="absolute bg-white border border-slate-400 w-full z-10 shadow-md overflow-y-auto max-h-[40vh] cursor-pointer">
          {users.map((user, index) => (
            <div key={index} className="p-2 hover:bg-slate-100">
              {user.firstName} {user.lastName}
              {" - "}
              <span className="text-slate-400">{user.email}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute bg-white border border-slate-400 w-full z-10 shadow-md overflow-y-auto max-h-[40vh] flex p-2 text-muted-foreground">
          no users found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
