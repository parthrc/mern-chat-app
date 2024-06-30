import { useAuth } from "../../../context/AuthContext";
import { cn } from "../../../lib/utils";
import { MessageObject } from "../../../store/useConversation";

interface MessageBubbleProps {
  message: MessageObject;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "flex w-full p-2",
        message.senderId === user?.id ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex w-fit py-1 px-2 rounded-md text-center",
          message.shouldShake ? "animate-shake" : "",

          message.senderId === user?.id
            ? "text-white bg-slate-900"
            : "bg-white text-black"
        )}
      >
        {message.message}
      </div>
    </div>
  );
};

export default MessageBubble;
