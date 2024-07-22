import { Input } from "../../../components/ui/input";
import { FaSearch } from "react-icons/fa";
import useSearchUsers from "../../../hooks/useSearchUsers";
import { useState } from "react";
import { ActiveConversation, UserObject } from "../../../types/api.types";
import useCreateNewConvo from "../../../hooks/useCreateNewConvo";
import useGetActiveConversations from "../../../hooks/useGetActiveConversations";
import useConversation from "../../../store/useConversation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { searchUsersApi } = useSearchUsers();
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<UserObject[] | null>(null);

  const { createNewConvoApi } = useCreateNewConvo();

  const { activeConversations } = useGetActiveConversations();
  const { setSelectedConversation } = useConversation();
  const navigate = useNavigate();

  // const localStorage = 

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

  const handleSearchedUserClick = async (receiverId: string) => {
    try {
      let isActiveConversation = false;
      // check if already have an activeConversation with clicked user
      activeConversations.forEach((convo: ActiveConversation) => {
        // console.log(receiverId);
        // console.log("Convo=", convo.otherParticipant._id);
        // if we already have a activeConversation with that user
        // setSelectedConversation to that conversation
        if (receiverId === convo.otherParticipant._id) {
          setSearchText("");
          setSelectedConversation(convo.conversationId, convo.otherParticipant);
          isActiveConversation = true;
        }
      });
      // if its not an activeConversation, send API call
      if (!isActiveConversation) {
        console.log("isActiveConversation", isActiveConversation);
        const res = await createNewConvoApi(receiverId);
        console.log("Res=", res);
        // Save necessary data in localStorage before refreshing
        localStorage.setItem("newConvo", JSON.stringify(res.data));
        navigate(0);
      }
    } catch (error) {
      toast.error("Error while searching");
    } finally {
      console.log("Ran finally");
      setSearchText("");
    }
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
      {searchText && users && (
        <div className="absolute bg-white border border-slate-400 w-full z-[1000] shadow-md overflow-y-auto max-h-[40vh] cursor-pointer">
          {users.map((user, index) => (
            <div
              key={index}
              className="p-2 hover:bg-slate-100"
              onClick={() => handleSearchedUserClick(user._id)}
            >
              {user.firstName} {user.lastName}
              {" - "}
              <span className="text-slate-400">{user.email}</span>
            </div>
          ))}
        </div>
      )}
      {searchText && (!users || users.length === 0) && (
        <div className="absolute bg-white border border-slate-400 w-full z-10 shadow-md overflow-y-auto max-h-[40vh] flex p-2 text-muted-foreground">
          no users found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
