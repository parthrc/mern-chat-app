import ChatDefault from "./ChatDefault";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  return (
    <div className="flex w-full flex-col max-h-screen">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
      {/* <ChatDefault /> */}
    </div>
  );
};

export default Chat;
