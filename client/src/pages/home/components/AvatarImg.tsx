import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useSocket } from "../../../context/SocketContext";
import { cn } from "../../../lib/utils";

interface AvatarImgProps {
  profileUrl?: string;
  participantId?: string;
}

const AvatarImg = ({ profileUrl, participantId }: AvatarImgProps) => {
  // get all onlineUsers from socket to set online status of current user
  const { onlineUsers } = useSocket();
  if (!participantId) return null;
  const isOnline = onlineUsers.includes(participantId);

  return (
    <div className="relative z-1">
      <Avatar>
        <AvatarImage src={profileUrl || "https://github.com/shadcn.png"} />

        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div
        className={cn(
          " p-[6px] absolute bottom-1 -right-1 z-[999] rounded-full ",
          isOnline ? "bg-green-600" : "bg-slate-400"
        )}
      ></div>
    </div>
  );
};

export default AvatarImg;
