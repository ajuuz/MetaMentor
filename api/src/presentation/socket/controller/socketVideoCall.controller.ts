import {
  videoRooms,
  videoRoomsChat,
} from "infrastructure/config/socket/context";
import { Server as SocketIoServer } from "socket.io";
import { ModifiedSocket } from "type/types";
export class SocketVideoCallController {
  private _socket: ModifiedSocket;
  private _io: SocketIoServer;

  constructor(socket: ModifiedSocket, io: SocketIoServer) {
    this._socket = socket;
    this._io = io;
  }

  public registerVideoCallConnectionHandlers(): void {
    // User joins a video call room
    this._socket.on(
      "video-call:join",
      (payload: { userKey: string; roomId: string }) => {
        const { userKey, roomId } = payload;
        this._socket.roomId = roomId;
        const socketId = this._socket.id;
        let users = videoRooms.get(roomId);

        if (!users) {
          users = [{ userKey, socketId }];
          videoRooms.set(roomId, users);
          videoRoomsChat.set(roomId, []);
        } else {
          users.push({ userKey, socketId });
        }

        console.log(videoRooms);
        this._socket.join(`video_call_${roomId}`);

        const existingUsers = videoRooms
          .get(roomId)
          ?.filter((user) => user.socketId !== this._socket.id);

        this._socket.emit("video-call:existing-users", existingUsers);

        this._socket.emit(
          "video-call:chat-messages",
          videoRoomsChat.get(roomId)
        );

        this._socket
          .to(`video_call_${roomId}`)
          .emit("video-call:new-user-joined", {
            userKey,
            socketId,
          });
      }
    );

    this._socket.on(
      "signal",
      ({
        userKey,
        targetId,
        signal,
      }: {
        userKey: string;
        targetId: string;
        signal: any;
      }) => {
        this._io.to(targetId).emit("signal", {
          userKey,
          callerId: this._socket.id,
          signal,
        });
      }
    );

    this._socket.on(
      "video-call:audio-status-change",
      ({ userKey, status }: { userKey: string; status: boolean }) => {
        this._socket.broadcast
          .to(`video_call_${this._socket.roomId}`)
          .emit("video-call:audio-status-change", {
            userKey,
            status,
          });
      }
    );

    this._socket.on(
      "video-call:screen-share",
      ({ userKey, status }: { userKey: string; status: boolean }) => {
        this._socket
          .to(`video_call_${this._socket.roomId}`)
          .emit("video-call:screen-share", {
            userKey,
            status,
          });
      }
    );

    this._socket.on(
      "video-call:message",
      (messageData: {
        userName: string;
        message: string;
        createdAt: string;
      }) => {
        console.log(this._socket.roomId);
        if (!this._socket.roomId) return;
        const messages = videoRoomsChat.get(this._socket.roomId);
        messages?.push(messageData);
        console.log(videoRoomsChat);
        this._socket
          .to(`video_call_${this._socket.roomId}`)
          .emit("video-call:message", messageData);
      }
    );

    this._socket.on("video-call:leave", () => {
      const userName = this._socket.userName;
      const roomId = this._socket.roomId;

      console.log(
        `User leaving: ${userName} (${this._socket.id}) from room ${roomId}`
      );

      if (!roomId) return;

      const users = videoRooms.get(roomId);
      if (users) {
        const updatedUsers = users.filter(
          (user) => user.socketId !== this._socket.id
        );
        videoRooms.set(roomId, updatedUsers);

        // ✅ Notify other users in the room
        this._socket.to(`video_call_${roomId}`).emit("video-call:user-left", {
          socketId: this._socket.id,
          userName,
        });

        // ✅ If room is empty, delete it completely
        if (updatedUsers.length === 0) {
          videoRooms.delete(roomId);
          videoRoomsChat.delete(roomId);
          console.log(`Room ${roomId} deleted (empty).`);
        }
      }

      // ✅ Make socket leave the room
      this._socket.leave(`video_call_${roomId}`);

      // ✅ Clear socket-specific data
      this._socket.roomId = undefined;

      console.log(`User ${userName} left room ${roomId}`);
    });

    // (Optional) Handle call end logic
    this._socket.on(
      "video-call:end",
      (payload: { roomId: string; userId: string }) => {
        this._socket
          .to(`video_call_${payload.roomId}`)
          .emit("video-call:ended", {
            userId: payload.userId,
          });
      }
    );
  }
}
