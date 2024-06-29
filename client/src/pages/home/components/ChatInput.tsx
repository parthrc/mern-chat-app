import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import useSendMessage from "../../../hooks/useSendMessage";
import { Button } from "../../../components/ui/button";
import useConversation from "../../../store/useConversation";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [text, setText] = useState<string>("");
  const { sendMessageApi, isLoading } = useSendMessage();
  const { selectedConversation } = useConversation();

  const handleSendMessage = async () => {
    if (!text.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    if (
      !selectedConversation ||
      !selectedConversation.user ||
      !selectedConversation.user._id
    ) {
      toast.error("No conversation selected");
      return;
    }

    try {
      await sendMessageApi(selectedConversation.user._id, text);
      setText(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message", error);
    }
  };
  return (
    <div className=" bg-slate-950 text-white w-full min-h-[4rem] flex items-center gap-x-4 px-4">
      {/* Attachments */}
      <div>
        <IoIosAttach className="h-6 w-6 cursor-pointer hover:text-black hover:bg-white rounded-full" />
      </div>
      {/* Main input */}
      <Input
        value={text}
        type="text"
        className="w-full text-black"
        placeholder="type your message here..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
      {/* Send button */}
      <Button onClick={handleSendMessage} disabled={isLoading}>
        <IoSend className="h-6 w-6 cursor-pointer" />
      </Button>
    </div>
  );
};

export default ChatInput;
