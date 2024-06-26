import AvatarImg from "./AvatarImg";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
const SidebarHeader = () => {
  return (
    <div className="bg-slate-950 text-white px-4 py-3 flex items-center gap-x-2 justify-between">
      {/* Profile pic */}
      <AvatarImg />

      <div className="flex items-center gap-x-4">
        {/* Dark mode toggle */}
        <MdOutlineDarkMode className="h-6 w-6 cursor-pointer hover:text-black hover:bg-white rounded-full" />
        {/* Options */}
        <BsThreeDotsVertical className="h-6 w-6 cursor-pointer hover:text-black hover:bg-white rounded-full" />
      </div>
    </div>
  );
};

export default SidebarHeader;
