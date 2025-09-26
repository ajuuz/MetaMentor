
type VideoCallContextType={
    userKey:string,
    socketId:string,
}

export const chatRooms = new Map<string,VideoCallContextType[]>()
export const videoRooms = new Map<string,VideoCallContextType[]>()