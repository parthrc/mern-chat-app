import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useSocket } from "../../../context/SocketContext";

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
      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-[99999] rounded-full "></div>
      )}
    </div>
  );
};

export default AvatarImg;
