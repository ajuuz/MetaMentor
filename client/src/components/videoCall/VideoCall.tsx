import {
  Mic,
  MicOff,
  ScreenShare,
  Video,
  VideoOff,
  VideoOffIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useSocket } from "@/context/socketContext";

type Props = {
  myUserKey: string;
};

type ModifiedTrack=MediaStreamTrack&{
  isScreenStream:boolean
}

type RemoteUser = {
  isCameraOff: boolean;
  isMuted: boolean;
  screenStream: MediaStream | null; // 👈 add this
};
const VideoCall = ({ myUserKey }: Props) => {
  // Local state flags
  const [remoteUsers, setRemoteUsers] = useState<Map<string, RemoteUser>>(
    new Map()
  );
  const [isCameraOff, setIsCameraOff] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isScreenShare, setIsScreenShare] = useState<boolean>(false);
  const userSocketMap = useRef<Record<string, string>>({});
  // Refs
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<Record<string, HTMLVideoElement | null>>({});
  const { socket } = useSocket();
  const pcRef = useRef<Record<string, RTCPeerConnection>>({});
  const localStreamRef = useRef<MediaStream | null>(null);

  const remoteUsersRef = useRef(remoteUsers);

  const { roomId } = useParams();
  if (!roomId) {
    return <div>No room id</div>;
  }

  function handleTrackOfRemoteUsers(
    userKey: string,
    media: "isCameraOff" | "isMuted",
    status: boolean
  ) {
    setRemoteUsers((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(userKey)) {
        newMap.set(userKey, {
          ...newMap.get(userKey)!,
          [media]: status,
        });
      }
      return newMap;
    });
  }
  function handleScreenStreamOfRemoteUsers(
    userKey: string,
    stream: MediaStream | null
  ) {
    setRemoteUsers((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(userKey)) {
        newMap.set(userKey, {
          ...newMap.get(userKey)!,
          screenStream: stream,
        });
      }
      return newMap;
    });
  }

  const setupPeerConnection = (
    isInitiator: boolean,
    user: { userKey: string; socketId: string }
  ) => {
    if (!socket) return;

    const localStream = localStreamRef.current;
    if (!localStream) return;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Add local tracks

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // Handle remote stream
    pc.ontrack = (event) => {
      const remoteStream = new MediaStream();
      event.streams[0].getTracks().forEach((track, index) => {
        remoteStream.addTrack(track);
        if (track.kind === "video") {
          const settings=track.getSettings()
          console.log("modified track",(track as ModifiedTrack).isScreenStream)
          const remote = remoteUsersRef.current.get(user.userKey);
          const isScreenTrack = remote && remote.screenStream === null;
          if (false) {
            console.log("adding new screeen share track");
            const newScreenStream = new MediaStream([track]);
            handleScreenStreamOfRemoteUsers(user.userKey, newScreenStream);

            // When screen share ends (user presses "Stop sharing")
            track.onended = () => {
              handleScreenStreamOfRemoteUsers(user.userKey, null);
            };
          } else {
            console.log("replacing  video track screeen share track");
            track.onmute = () =>
              handleTrackOfRemoteUsers(user.userKey, "isCameraOff", true);
            track.onunmute = () =>
              handleTrackOfRemoteUsers(user.userKey, "isCameraOff", false);
            track.onended = () =>
              handleTrackOfRemoteUsers(user.userKey, "isCameraOff", true);
          }
        }

        if (track.kind === "audio") {
          track.onmute = () =>
            handleTrackOfRemoteUsers(user.userKey, "isMuted", true);
          track.onunmute = () =>
            handleTrackOfRemoteUsers(user.userKey, "isMuted", false);
          track.onended = () =>
            handleTrackOfRemoteUsers(user.userKey, "isMuted", true);
        }
      });

      // Assign the stream to the correct video element
      const remoteVideoElement = remoteVideoRef.current[user.userKey];
      if (remoteVideoElement) {
        remoteVideoElement.srcObject = remoteStream;
      }
    };

    // ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit("signal", {
          userKey: myUserKey,
          targetId: user.socketId,
          signal: { type: "candidate", candidate: event.candidate },
        });
      }
    };

    pcRef.current[user.userKey] = pc;

    if (isInitiator) {
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          if (socket && pc.localDescription) {
            socket.emit("signal", {
              userKey: myUserKey,
              targetId: user.socketId,
              signal: pc.localDescription,
            });
          }
        });
    }
  };

  const setUpSocket = () => {
    if (!socket) return;

    socket.emit("video-call:join", { userKey: myUserKey, roomId });

    // If someone is already in the room, this is the new joiner → initiate offer
    socket.on(
      "video-call:existing-users",
      (users: { userKey: string; socketId: string }[]) => {

        const map = new Map();
        users.forEach((user) => {
          map.set(user.userKey, {
            isCameraOff: false,
            isMuted: false,
            screenStream: null,
          });
        });
        setRemoteUsers(map);

        for (let i = 0; i < users.length; i++) {
          userSocketMap.current[users[i].userKey] = users[i].socketId;
          setupPeerConnection(true, users[i]);
        }
      }
    );

    // If a new user joins, existing user pre-creates peer connection but does NOT initiate
    socket.on(
      "video-call:new-user-joined",
      (newUser: { userKey: string; socketId: string }) => {
        setRemoteUsers((prev) => {
          const newMap = new Map(prev);
          newMap.set(newUser.userKey, {
            isCameraOff: false,
            isMuted: false,
            screenStream: null,
          });
          return newMap;
        });
        userSocketMap.current[newUser.userKey] = newUser.socketId;
        setupPeerConnection(false, newUser);
      }
    );

    // Handle signaling
    socket.on("signal", async ({ userKey, callerId, signal }) => {
      const pc = pcRef.current[userKey];
      if (!pc) return;

      if (signal.type === "offer") {
        await pc.setRemoteDescription(new RTCSessionDescription(signal));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        if (socket) {
          socket.emit("signal", {
            userKey: myUserKey,
            targetId: callerId,
            signal: pc.localDescription,
          });
        }
      }

      if (signal.type === "answer") {
        await pc.setRemoteDescription(new RTCSessionDescription(signal));
      }

      if (signal.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
      }
    });

    socket.on(
      "video-call:audio-status-change",
      ({ userKey, status }: { userKey: string; status: boolean }) => {
        setRemoteUsers((prev) => {
          const newMap = new Map(prev);
          if (newMap.has(userKey)) {
            newMap.set(userKey, {
              ...newMap.get(userKey)!,
              isMuted: status,
            });
          }
          return newMap;
        });
      }
    );

    // socket.on(
    //   "video-call:screen-share",
    //   ({ userKey, status }: { userKey: string; status: boolean }) => {
    //     setRemoteUsers((prev) => {
    //       const newMap = new Map(prev);
    //       if (newMap.has(userKey)) {
    //         newMap.set(userKey, {
    //           ...newMap.get(userKey)!,
    //           screenStream: status,
    //         });
    //       }
    //       return newMap;
    //     });
    //   }
    // );
  };

  const setupLocalStream = async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      setUpSocket();
    } catch (err) {
      console.error("Failed to get local media", err);
    }
  };

  useEffect(() => {
    if (!socket) return;
    setupLocalStream();
    return () => {
      socket.emit("video-call:disconnect");
      socket.off("video-call:your-userKey");
      socket.off("video-call:existing-users");
      socket.off("video-call:new-user-joined");
      socket.off("signal");

      if (pcRef.current) {
        Object.values(pcRef.current).forEach((pc) => pc.close());
        pcRef.current = {};
      }
    };
  }, [socket, roomId]);

  useEffect(() => {
    remoteUsersRef.current = remoteUsers; // keep ref updated on every render
  }, [remoteUsers]);

  const handleVideoTrack = async () => {
    if (!localStreamRef.current || !localVideoRef.current) return;

    const videoTrack = localStreamRef.current.getVideoTracks()[0];
    if (videoTrack && videoTrack.readyState === "live") {
      videoTrack.stop();
      localStreamRef.current.removeTrack(videoTrack);
      setIsCameraOff(true);
    } else {
      const newSteam = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const newVideoTrack = newSteam.getVideoTracks()[0];
      Object.values(pcRef.current).forEach((pc) => {
        const sender = pc
          .getSenders()
          .find((s) => s.track && s.track.kind === "video");
        if (sender) sender.replaceTrack(newVideoTrack);
      });
      localStreamRef.current.addTrack(newVideoTrack);
      localVideoRef.current.srcObject = localStreamRef.current;
      setIsCameraOff(false);
    }
  };
  const handleAudioTrack = async () => {
    if (!localStreamRef.current || !localVideoRef.current) return;
    const audioTrack = localStreamRef.current.getAudioTracks()[0];

    if (audioTrack && audioTrack.readyState === "live") {
      audioTrack.stop();
      localStreamRef.current.removeTrack(audioTrack);
      setIsAudioMuted(true);
      socket?.emit("video-call:audio-status-change", {
        userKey: myUserKey,
        status: true,
      });
    } else {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const newAudioTrack = newStream.getAudioTracks()[0];

      // Replace track in every peer connection
      Object.values(pcRef.current).forEach((pc) => {
        const sender = pc
          .getSenders()
          .find((s) => s.track && s.track.kind === "audio");
        if (sender) sender.replaceTrack(newAudioTrack);
      });

      localStreamRef.current.addTrack(newAudioTrack);
      setIsAudioMuted(false);
      socket?.emit("video-call:audio-status-change", {
        userKey: myUserKey,
        status: false,
      });
    }
  };

  const handleScreenShare = async () => {
    if (screenStream) {
      screenStream.getTracks().forEach((t) => t.stop());
      setScreenStream(null);

      // Remove track from peer connections
      Object.values(pcRef.current).forEach((pc) => {
        const senders = pc
          .getSenders()
          .filter(
            (s) => s.track?.kind === "video" && s.track.label.includes("screen")
          );
        senders.forEach((sender) => pc.removeTrack(sender));
      });

      socket?.emit("video-call:screen-share", {
        userKey: myUserKey,
        status: false,
      });
      return;
    }

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      displayStream.getVideoTracks().forEach((track) => ((track as ModifiedTrack).isScreenStream = true));
      setScreenStream(displayStream);

      Object.entries(pcRef.current).forEach(async ([userKey, pc]) => {
        displayStream
          .getTracks()
          .forEach((track) => pc.addTrack(track, displayStream));

        // renegotiate
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const targetSocketId = userSocketMap.current[userKey]; // <--- use this
        if (socket && targetSocketId) {
          socket.emit("signal", {
            userKey: myUserKey,
            targetId: targetSocketId,
            signal: pc.localDescription,
          });
        }
      });

      socket?.emit("video-call:screen-share", {
        userKey: myUserKey,
        status: true,
      });
    } catch (error) {
      console.error("Error sharing screen", error);
    }
  };

  const totalTiles =
    (screenStream ? 1 : 0) +
    remoteUsers.size +
    [...remoteUsers.values()].filter((user) => user.screenStream).length;


  let gridCols = "grid-cols-1";
  if (totalTiles > 1 && totalTiles < 5) {
    gridCols = `grid-cols-${totalTiles}`;
  } else if (totalTiles >= 5) {
    gridCols = "grid-cols-4";
  }

  return (
    <div
      className="h-screen flex flex-col bg-black text-white"
    >
      <main
        className={`flex-1 my-5 gap-5 relative grid ${gridCols} gap-2 place-items-center`}
      >
        {/* Local video */}
        <div
          className={`${
            remoteUsers.size === 1 ? "absolute bottom-5 right-5 w-35" : "h-full"
          } rounded-lg overflow-hidden border `}
        >
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full aspect-video object-cover rounded-2xl scale-x-[-1]"
          />
        </div>

        {/* Local screen share */}
        {screenStream && (
          <div className="h-full rounded-lg overflow-hidden border">
            <video
              autoPlay
              muted
              playsInline
              ref={(el) => {
                if (el) el.srcObject = screenStream;
              }}
              className="w-full h-full object-cover aspect-video rounded-2xl "
            />
          </div>
        )}

        {/* Remote videos */}
        {[...remoteUsers.entries()].map(([username, user]) => (
          <>
            <div
              key={username}
              className={`relative h-full  ${
                (remoteUsers.size !== 1 || user.isCameraOff) && "w-full"
              }`}
            >
              <video
                ref={(el) => {
                  if (el) remoteVideoRef.current[username] = el;
                }}
                autoPlay
                playsInline
                className={`${
                  user.isCameraOff && "hidden"
                } w-full h-full aspect-video object-cover rounded-2xl  scale-x-[-1]`}
              />
              <div
                className={`${
                  user.isCameraOff ? "block" : "hidden"
                } w-full h-full bg-slate-900 flex items-center justify-center rounded-2xl`}
              >
                <div
                  className={`absolute ${
                    user.isMuted ? "top-6" : "top-3"
                  } right-3 transition-all duration-700 p-1 rounded-full bg-slate-400/50 text-gray-400`}
                >
                  <VideoOff />
                </div>
                <div className="flex justify-center items-center  h-15 w-15 font-bold border-2 border-slate-400 text-xl rounded-full bg-slate-400/50 text-gray-400">
                  {username}
                </div>
              </div>
              {user.isMuted && (
                <div className="absolute top-3 right-3  p-1 rounded-full bg-slate-400/50 text-gray-400">
                  <MicOff size={16} />
                </div>
              )}
            </div>
            {user.screenStream && (
              <div className="h-full rounded-lg overflow-hidden border">
                <video
                  autoPlay
                  muted
                  playsInline
                  ref={(el) => {
                    if (el) el.srcObject = user.screenStream;
                  }}
                  className="w-full h-full object-cover aspect-video rounded-2xl "
                />
              </div>
            )}
          </>
        ))}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center  text-2xl font-semibold  flex justify-center gap-5">
        <Button className=" w-13 py-5" onClick={handleAudioTrack}>
          {isAudioMuted ? <MicOff /> : <Mic />}
        </Button>
        <Button className=" w-13 py-5" onClick={handleVideoTrack}>
          {isCameraOff ? <VideoOffIcon /> : <Video />}
        </Button>
        <Button
          className={`${isScreenShare && "bg-white text-black"} w-13 py-5`}
          onClick={handleScreenShare}
        >
          {isScreenShare ? <ScreenShare /> : <ScreenShare />}
        </Button>
        <div></div>
      </footer>
    </div>
  );
};

export default VideoCall;
