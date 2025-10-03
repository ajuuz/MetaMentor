import {
  chatRooms,
  chatRoomOnlineUsers,
} from "infrastructure/config/socket/context";
import { ModifiedSocket } from "type/types";
import { Server as SocketIoServer } from "socket.io";
import { CommunityChatRepository } from "infrastructure/repository/communityChat.repository";
import { ICommunityChatRepository } from "domain/repositoryInterfaces/communityChatRepository.interface";

type ChatContextType = {
  userKey: string;
  socketId: string;
};

type ChatMessageType = {
  senderName: string;
  content: string;
  createdAt: string;
};

export class SocketChatController {
  private _socket: ModifiedSocket;
  private _io: SocketIoServer;
  private _chatRepo: ICommunityChatRepository;

  constructor(socket: ModifiedSocket, io: SocketIoServer) {
    this._socket = socket;
    this._io = io;
    this._chatRepo = new CommunityChatRepository();
  }

  public registerChatRoomConnectionHandlers(): void {
    // -------------------- Join Chat Room --------------------
    this._socket.on(
      "chat:join",
      async (payload: { userKey: string; roomId: string; userId: string }) => {
        const { userKey, roomId, userId } = payload;
        this._socket.roomId = roomId;
        const socketId = this._socket.id;

        // Track online users in room
        if (!chatRoomOnlineUsers.has(roomId))
          chatRoomOnlineUsers.set(roomId, new Set());
        chatRoomOnlineUsers.get(roomId)?.add(userKey);

        // Track socket info for the room
        if (!chatRooms.has(roomId)) chatRooms.set(roomId, []);
        chatRooms.get(roomId)?.push({ userKey, socketId });

        // Join Socket.io room
        this._socket.join(`chat_${roomId}`);

        // Fetch last 50 messages from DB
        try {
          const lastMessages = await this._chatRepo.getAllMessages(roomId, 50);
          this._socket.emit("chat:history", lastMessages);
        } catch (err) {
          console.error("Error fetching chat history:", err);
        }

        // Notify online users in room
        this._io
          .to(`chat_${roomId}`)
          .emit(
            "chat:online-users",
            Array.from(chatRoomOnlineUsers.get(roomId)!)
          );

        // Notify others about new user
        this._socket
          .to(`chat_${roomId}`)
          .emit("chat:new-user", { userKey, socketId });
      }
    );

    // -------------------- Send Message --------------------
    this._socket.on(
      "chat:message",
      async (messageData: {
        roomId: string;
        senderId: string;
        senderName: string;
        message: string;
      }) => {
        if (!this._socket.roomId) return;

        try {
          // Save to DB
          const savedMessage = await this._chatRepo.saveMessage({
            communityId: messageData.roomId,
            studentId: messageData.senderId,
            content: messageData.message,
          });
          // Emit message to all users in room
          this._io
            .to(`chat_${this._socket.roomId}`)
            .emit("chat:message", savedMessage);
        } catch (err) {
          console.error("Error saving message:", err);
        }
      }
    );

    // -------------------- Typing Indicator --------------------
    this._socket.on(
      "chat:typing",
      (payload: { roomId: string; userKey: string }) => {
        if (!this._socket.roomId) return;
        this._socket
          .to(`chat_${this._socket.roomId}`)
          .emit("chat:typing", payload.userKey);
      }
    );

    this._socket.on(
      "chat:stop-typing",
      (payload: { roomId: string; userKey: string }) => {
        if (!this._socket.roomId) return;
        this._socket
          .to(`chat_${this._socket.roomId}`)
          .emit("chat:stop-typing", payload.userKey);
      }
    );

    // -------------------- Leave Room --------------------
    this._socket.on("chat:leave", () => {
      const roomId = this._socket.roomId;
      if (!roomId) return;

      // Remove from chatRooms
      const roomContext = chatRooms.get(roomId);
      if (roomContext) {
        const idx = roomContext.findIndex(
          (c) => c.socketId === this._socket.id
        );
        if (idx !== -1) roomContext.splice(idx, 1);
        if (roomContext.length === 0) chatRooms.delete(roomId);
      }

      // Remove from online users
      chatRoomOnlineUsers.get(roomId)?.delete(this._socket.userName || "");

      // Notify remaining users
      this._io
        .to(`chat_${roomId}`)
        .emit(
          "chat:online-users",
          Array.from(chatRoomOnlineUsers.get(roomId) || [])
        );

      this._socket.leave(`chat_${roomId}`);
    });

    // -------------------- Disconnect --------------------
    this._socket.on("disconnect", () => {
      const roomId = this._socket.roomId;
      if (!roomId) return;

      // Remove from chatRooms
      const roomContext = chatRooms.get(roomId);
      if (roomContext) {
        const idx = roomContext.findIndex(
          (c) => c.socketId === this._socket.id
        );
        if (idx !== -1) roomContext.splice(idx, 1);
        if (roomContext.length === 0) chatRooms.delete(roomId);
      }

      // Remove from online users
      chatRoomOnlineUsers.get(roomId)?.delete(this._socket.userName || "");

      // Notify remaining users
      this._io
        .to(`chat_${roomId}`)
        .emit(
          "chat:online-users",
          Array.from(chatRoomOnlineUsers.get(roomId) || [])
        );
    });
  }
}
