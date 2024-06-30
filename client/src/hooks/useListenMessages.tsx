import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import useConversation from "../store/useConversation";

const useListenMessages = () => {
  const { socket } = useSocket();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
    });

    // cleanup function
    // turn off this lsitner when component unmounts
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);

  return null;
};

export default useListenMessages;
