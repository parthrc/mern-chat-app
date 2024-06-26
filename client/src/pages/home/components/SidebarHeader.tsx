import AvatarImg from "./AvatarImg";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { useAuth } from "../../../context/AuthContext";

const SidebarHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-slate-950 text-white px-4 py-3 flex items-center gap-x-2 justify-between">
      {/* Profile pic */}
      <AvatarImg />

      <div className="flex items-center gap-x-4">
        {/* Dark mode toggle */}
        <MdOutlineDarkMode className="h-6 w-6 cursor-pointer hover:text-black hover:bg-white rounded-full" />
        {/* Options */}
        {/* <BsThreeDotsVertical className="h-6 w-6 cursor-pointer hover:text-black hover:bg-white rounded-full" /> */}
        <Popover>
          <PopoverTrigger>
            <div className="cursor-pointer hover:text-blue-300">
              <BsThreeDotsVertical className="h-8 w-8" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="z-[99999] divide-y-2">
            <div className="flex items-center cursor-pointer p-2 rounded-sm gap-x-2 text-ellipsis">
              {`${user?.firstName}'s app`}
            </div>
            <div
              className="flex items-center hover:bg-red-100 cursor-pointer p-2 rounded-sm gap-x-2"
              onClick={handleLogout}
            >
              <CiLogout />
              Logout
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SidebarHeader;
