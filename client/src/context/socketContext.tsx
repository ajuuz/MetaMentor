import { useUserStore } from "@/zustand/userStore";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface ISocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<ISocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user) return;
    const socketInstance = io("https://192.168.10.161:4000", {
      path: "/api/socket.io",
      withCredentials: true, // if cookies are used
    });

    socketInstance.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, [user]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket must be used within a SocketProvider");
  return context;
};
