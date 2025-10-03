type ChatContextType = {
  userKey: string;
  socketId: string;
};

type VideoCallContextType = {
  userKey: string;
  socketId: string;
};
type VideoCallChatType = {
  userName: string;
  message: string;
  createdAt: string;
};

export const chatRooms = new Map<string, ChatContextType[]>();
export const chatRoomOnlineUsers = new Map<string, Set<string>>();

export const videoRooms = new Map<string, VideoCallContextType[]>();
export const videoRoomsChat = new Map<string, VideoCallChatType[]>();
