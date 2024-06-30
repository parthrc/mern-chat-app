import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { useAuth } from "../../../context/AuthContext";
import { useSocket } from "../../../context/SocketContext";

interface AvatarImgProps {
  profileUrl?: string;
  participantId?: string;
}

const AvatarImg = ({ profileUrl, participantId }: AvatarImgProps) => {
  // get all onlineUsers from socket to set online status of current user
  const { onlineUsers } = useSocket();
  const { user } = useAuth();
  if (!user) return null;
  let isOnline;
  
  if (participantId) {
    isOnline = onlineUsers.includes(participantId);
  } else {
    isOnline = onlineUsers.includes(user.id);
  }

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
