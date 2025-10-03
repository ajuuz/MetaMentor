"use client";

import {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Wifi } from "lucide-react";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/zustand/userStore";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import type { IGetCommunityChat } from "@/types/entity/communityChat";
import { useSocket } from "@/context/socketContext";

const ChatRoom = () => {
  const [messages, setMessages] = useState<IGetCommunityChat[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const { user } = useUserStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { communityId } = useParams();
  const { socket } = useSocket();

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // --------------------- SOCKET EVENTS ---------------------
  useEffect(() => {
    if (!socket || !communityId) return;

    // Join room
    socket.emit("chat:join", {
      userKey: user?.name,
      roomId: communityId,
      userId: user?._id,
    });

    // Receive chat history
    socket.on("chat:history", (history: IGetCommunityChat[]) => {
      setMessages(history);
    });

    // Receive new messages
    socket.on("chat:message", (message: IGetCommunityChat) => {
      setMessages((prev) => [...prev, message]);
      setTypingUsers((prev) => prev.filter((u) => u !== message.studentName));
    });

    // Online users
    socket.on("chat:online-users", (users: string[]) => {
      setOnlineUsers(users);
    });

    // Typing indicators
    socket.on("chat:typing", (userName: string) => {
      if (userName === user?.name) return;

      setTypingUsers((prev) => {
        if (prev.includes(userName)) return prev; // already present, do nothing
        return [...prev, userName]; // add new user
      });
    });

    socket.on("chat:stop-typing", (userName: string) => {
      console.log("working");
      setTypingUsers((prev) => prev.filter((u) => u !== userName));
    });

    return () => {
      socket.emit("chat:leave");
      socket.off("chat:history");
      socket.off("chat:message");
      socket.off("chat:online-users");
      socket.off("chat:typing");
      socket.off("chat:stop-typing");
    };
  }, [socket, communityId]);

  // --------------------- AUTO SCROLL ---------------------
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --------------------- SEND MESSAGE ---------------------
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    socket.emit("chat:message", {
      roomId: communityId,
      senderId: user?._id,
      senderName: user?.name,
      message: newMessage,
    });

    setNewMessage("");
    socket.emit("chat:stop-typing", user?.name);
  };

  // --------------------- TYPING ---------------------
  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);

    if (!socket) return;

    if (value.trim()) {
      socket.emit("chat:typing", { roomId: communityId, userKey: user?.name });
    } else {
      socket.emit("chat:stop-typing", {
        roomId: communityId,
        userKey: user?.name,
      });
    }
  };


  console.log(messages)
  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="h-full fixed sm:relative border-r bg-card flex flex-col transition-all duration-500 -translate-x-full sm:translate-x-0">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Chat Room</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                <Wifi className="h-3 mr-1" />
                Connected
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Online ({onlineUsers.length})
                </span>
              </div>
              <div className="space-y-2">
                {onlineUsers.map((username) => (
                  <div
                    key={username}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{username}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex-col flex">
        <div className="p-4 border-b bg-card w-full transition-all duration-300">
          <div className="flex items-center sm:justify-end justify-between">
            <div>
              <h1 className="text-xl font-semibold">General Chat</h1>
              <p className="text-sm text-muted-foreground">
                {onlineUsers.length} members online
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message._id}
              message={{
                _id: message._id,
                senderName: message.studentName,
                content: message.content,
                createdAt: message.createdAt,
              }}
            />
          ))}
          <TypingIndicator users={typingUsers} />
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-card w-full transition-all duration-300">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={handleTyping}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
