import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  return (
    <div className="flex w-full flex-col">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default Chat;
