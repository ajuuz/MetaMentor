
type VideoCallContextType={
    userKey:string,
    socketId:string,
}
type VideoCallChatType={
    userName:string,
    message:string,
    createdAt:string
}

export const chatRooms = new Map<string,VideoCallContextType[]>()
export const videoRooms = new Map<string,VideoCallContextType[]>()
export const videoRoomsChat = new Map<string,VideoCallChatType[]>()