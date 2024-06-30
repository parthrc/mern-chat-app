import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import useGetMessages from "../../../hooks/useGetMessages";
import useListenMessages from "../../../hooks/useListenMessages";

const ChatMessages = () => {
  const { messages, isLoading } = useGetMessages();
  useListenMessages();
  const latestMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      latestMsgRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="bg-slate-200 w-full grow overflow-y-auto flex flex-col">
      {isLoading && <div>Loading...</div>}
      {!isLoading && messages.length === 0 && (
        <div>No messages yet, send your first message</div>
      )}
      {!isLoading && messages.length > 0 && (
        <div className="flex flex-col w-full gap-y-1">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
          <div ref={latestMsgRef}></div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
