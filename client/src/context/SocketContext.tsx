import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
  setOnlineUsers: (users: string[]) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:8000/", {
        query: {
          userId: user.id,
        },
      });
      setSocket(newSocket);

      // Get all online users and set to localState
      newSocket.on("getOnlineUsers", (onlineUsers: string[]) => {
        setOnlineUsers(onlineUsers);
      });

      // Cleanup function
      return () => {
        console.log(onlineUsers);
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to expose the socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within an SocketProvider");
  }
  return context;
};
