import { BsThreeDotsVertical } from "react-icons/bs";
import AvatarImg from "./AvatarImg";
import useConversation from "../../../store/useConversation";
const ChatHeader = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="bg-slate-950 text-white px-4 py-3 flex items-center gap-x-2 justify-between">
      {/* Profile pic */}
      <div className="flex items-center gap-x-2">
        <AvatarImg />
        <p>
          {`  ${selectedConversation?.user?.firstName} 
          ${selectedConversation?.user?.lastName}`}
        </p>
      </div>
      <BsThreeDotsVertical className="h-6 w-6 cursor-pointer hover:text-black hover:bg-white rounded-full" />
    </div>
  );
};

export default ChatHeader;
