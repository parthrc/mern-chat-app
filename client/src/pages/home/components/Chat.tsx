import { useEffect } from "react";
import useConversation from "../../../store/useConversation";
import ChatDefault from "./ChatDefault";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const Chat = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  // we need to reset the selected conversation
  // when the component unmounts
  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(undefined, undefined);
  }, [setSelectedConversation]);

  return (
    <div className="flex w-full flex-col max-h-screen">
      {selectedConversation?.conversationId && (
        <>
          <ChatHeader />
          <ChatMessages />
          <ChatInput />
        </>
      )}

      {!selectedConversation?.conversationId && <ChatDefault />}
    </div>
  );
};

export default Chat;
