import { videoRooms } from "infrastructure/config/socket/context";
import { ModifiedSocket } from "type/types";
import { Server as SocketIoServer } from "socket.io";
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
        console.log("video-call joined ");
        const { userKey, roomId } = payload;
        this._socket.roomId = roomId;
        const socketId = this._socket.id;
        console.log(userKey, roomId);
        let users = videoRooms.get(roomId);

        if (!users) {
          users = [{ userKey, socketId }];
          videoRooms.set(roomId, users);
        } else {
          users.push({ userKey, socketId });
        }

        this._socket.join(`video_call_${roomId}`);

        console.log(videoRooms);
        const existingUsers = videoRooms
          .get(roomId)
          ?.filter((user) => user.socketId !== this._socket.id);

        console.log(existingUsers);
        this._socket.emit("video-call:existing-users", existingUsers);

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

    

    this._socket.on("video-call:leave", () => {
      console.log("Disconnected: ", this._socket.userName);
      if (this._socket.roomId && videoRooms.has(this._socket.roomId)) {
        const users = videoRooms.get(this._socket.roomId);
        if (users) {
          const updatedUsers = users.filter(
            (user) => user.socketId !== this._socket.id
          );
          // Update the Map with filtered list
          videoRooms.set(this._socket.roomId, updatedUsers);
          // Optional: remove the room if empty
          if (updatedUsers.length === 0) {
            videoRooms.delete(this._socket.roomId);
          }
        }
      }
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
