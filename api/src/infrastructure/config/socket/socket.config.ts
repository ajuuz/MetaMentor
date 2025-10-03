import { Server as SocketIoServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { config } from "shared/config";
import { SocketVideoCallController } from "presentation/socket/controller/socketVideoCall.controller";
import { socketAuthMiddleware } from "presentation/socket/middleware/auth.middleware";
import { ModifiedSocket } from "type/types";
import { UserRepository } from "infrastructure/repository/user.repository";
import { videoRooms } from "./context";
import { SocketChatController } from "presentation/socket/controller/socketChat.controller";

export class SocketConfig {
  private static _io: SocketIoServer;

  public static init(server: HTTPServer): SocketIoServer {
    if (!SocketConfig._io) {
      SocketConfig._io = new SocketIoServer(server, {
        path: "/api/socket.io",
        cors: {
          origin: [config.client.uri, "https://192.168.29.148:5173"],
          credentials: true,
        },
      });
    }

    SocketConfig._io.use(socketAuthMiddleware);

    SocketConfig._io.use(async (socket: ModifiedSocket, next) => {
      const _id = socket.userId;
      const user = await new UserRepository().findOne({ _id });
      if (!user) {
        return next(new Error("User not found")); // reject connection
      }
      socket.userName = user.name;
      next();
    });

    SocketConfig._io.on("connection", (socket: ModifiedSocket) => {
      console.log(`socket connected: ${socket.id}`);

      const videoCallController = new SocketVideoCallController(
        socket,
        SocketConfig._io
      );
      const chatController = new SocketChatController(
        socket,
        SocketConfig._io
      );

      videoCallController.registerVideoCallConnectionHandlers();
      chatController.registerChatRoomConnectionHandlers();

      socket.on("disconnect", () => {
        console.log("Disconnected: ", socket.userName);
        if (socket.roomId && videoRooms.has(socket.roomId)) {
          const users = videoRooms.get(socket.roomId);
          if (users) {
            const updatedUsers = users.filter(
              (user) => user.socketId !== socket.id
            );
            videoRooms.set(socket.roomId, updatedUsers);
            if (updatedUsers.length === 0) videoRooms.delete(socket.roomId);
          }
        }
      });
    });
    return SocketConfig._io;
  }

  // Getter to access io instance anywhere in the app
  public static getIo(): SocketIoServer {
    if (!SocketConfig._io) {
      throw new Error(
        "Socket.io server not initialized. Call Socket.init(server) first."
      );
    }
    return SocketConfig._io;
  }
}
