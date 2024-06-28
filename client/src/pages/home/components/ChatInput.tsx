import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { Input } from "../../../components/ui/input";
import { useState } from "react";

const ChatInput = () => {
  const [text, setText] = useState<string>("");

  const handleSendMessage = () => {
    console.log("Clicked", text);
    setText("");
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
      <div onClick={handleSendMessage}>
        <IoSend className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatInput;
