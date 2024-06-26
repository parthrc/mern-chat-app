import { LuMessagesSquare } from "react-icons/lu";
const ChatDefault = () => {
  return (
    <div className="flex flex-col items-center my-auto gap-y-4">
      <h1 className="text-5xl font-bold"> Welcome, User 👋</h1>
      <p className=" text-center text-3xl">Select a chat to start messaging</p>
      <LuMessagesSquare className="h-[5rem] w-[5rem]" />
    </div>
  );
};

export default ChatDefault;
