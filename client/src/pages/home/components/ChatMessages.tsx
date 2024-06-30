import { useEffect, useState } from "react";
import useConversation from "../../../store/useConversation";
import toast from "react-hot-toast";
import MessageBubble from "./MessageBubble";
import useGetMessages from "../../../hooks/useGetMessages";
import useListenMessages from "../../../hooks/useListenMessages";

const ChatMessages = () => {
  const { selectedConversation, setMessages, messages } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const { getMessagesApi } = useGetMessages();
  // incoming message listener
  useListenMessages();

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchMessages = async () => {
        if (!selectedConversation?.user?._id) return;
        const res = await getMessagesApi({
          participantId: selectedConversation?.user?._id,
        });
        setMessages(res.data.messages);
        return res.data.messages;
      };

      fetchMessages();
    } catch (error) {
      toast.error("Error fetcxhing messages");
    } finally {
      setIsLoading(false);
    }
  }, [selectedConversation?.user?._id, messages, getMessagesApi, setMessages]);

  return (
    <div className=" bg-slate-200 w-full end grow overflow-y-auto flex-col">
      {isLoading && <div>Loading...</div>}
      {!isLoading && messages.length === 0 && (
        <div>No msgs yet, send your first message</div>
      )}
      {!isLoading && messages && (
        <div className="flex flex-col w-full  gap-y-1">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
