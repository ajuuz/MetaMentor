// type User = { userId: string; userName: string; socketId: string };

// const setupPeerConnection = (
//   localStreamRef: React.RefObject<MediaStream>,
//   socketRef: React.RefObject<WebSocket>,
//   remoteVideoRef:React.RefObject<Record<string, HTMLVideoElement>>,
//   isInitiator: boolean,
//   user: User
// ) => {
//   const pc = new RTCPeerConnection({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   });

//   // Add local tracks
//   localStreamRef.current.getTracks().forEach((track) => {
//     pc.addTrack(track, localStreamRef.current);
//   });

//   // Handle remote stream
//   pc.ontrack = (event) => {
//     const remoteStream = new MediaStream();
//     event.streams[0].getTracks().forEach((track, index) => {
//       remoteStream.addTrack(track);

//       if (track.kind === "video") {
//         console.log("track is video index", index);
//         track.onmute = () =>
//           handleTrackOfRemoteUsers(user.userName, "isCameraOff", true);
//         track.onunmute = () =>
//           handleTrackOfRemoteUsers(user.userName, "isCameraOff", false);
//         track.onended = () =>
//           handleTrackOfRemoteUsers(user.userName, "isCameraOff", true);
//       }

//       if (track.kind === "audio") {
//         console.log("track is audio index", index);
//         track.onmute = () =>
//           handleTrackOfRemoteUsers(user.userName, "isMuted", true);
//         track.onunmute = () =>
//           handleTrackOfRemoteUsers(user.userName, "isMuted", false);
//         track.onended = () =>
//           handleTrackOfRemoteUsers(user.userName, "isMuted", true);
//       }
//     });

//     // Assign the stream to the correct video element
//     const remoteVideoElement = remoteVideoRef.current[user.userName];
//     if (remoteVideoElement) {
//       remoteVideoElement.srcObject = remoteStream;
//     }
//   };

//   // ICE candidates
//   pc.onicecandidate = (event) => {
//     if (event.candidate) {
//       socketRef.current.emit("signal", {
//         username: localUserName,
//         targetId: user.socketId,
//         signal: { type: "candidate", candidate: event.candidate },
//       });
//     }
//   };

//   pcRef.current[user.username] = pc;

//   if (isInitiator) {
//     pc.createOffer()
//       .then((offer) => pc.setLocalDescription(offer))
//       .then(() => {
//         socketRef.current.emit("signal", {
//           username: localUserName,
//           targetId: user.socketId,
//           signal: pc.localDescription,
//         });
//       });
//   }
// };

// const setUpSocket = () => {
//   socketRef.current = io.connect("https://192.168.29.148:8080");

//   socketRef.current.emit("join", { username: localUserName, channel });

//   // If someone is already in the room, this is the new joiner → initiate offer
//   socketRef.current.on("all-users", ({ users }) => {
//     const map = new Map();
//     users.forEach((user) => {
//       map.set(user.username, { isCameraOff: false, isMuted: false });
//     });
//     setRemoteUsers(map);
//     for (let i = 0; i < users.length; i++) {
//       setupPeerConnection(true, users[i]);
//     }
//   });

//   // If a new user joins, existing user pre-creates peer connection but does NOT initiate
//   socketRef.current.on("new-user-joined", (newUser) => {
//     setRemoteUsers((prev) => {
//       const newMap = new Map(prev);
//       newMap.set(newUser.username, { isCameraOff: false, isMuted: false });
//       return newMap;
//     });
//     setupPeerConnection(false, newUser);
//   });

//   // Handle signaling
//   socketRef.current.on("signal", async ({ username, callerId, signal }) => {
//     const pc = pcRef.current[username];
//     if (!pc) return;

//     if (signal.type === "offer") {
//       await pc.setRemoteDescription(new RTCSessionDescription(signal));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       socketRef.current.emit("signal", {
//         username: localUserName,
//         targetId: callerId,
//         signal: pc.localDescription,
//       });
//     }

//     if (signal.type === "answer") {
//       await pc.setRemoteDescription(new RTCSessionDescription(signal));
//     }

//     if (signal.candidate) {
//       await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
//     }
//   });
// };

// const setupLocalStream = async () => {
//   try {
//     const localStream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     localStreamRef.current = localStream;
//     localVideoRef.current.srcObject = localStream;
//     setUpSocket();
//   } catch (err) {
//     console.error("Failed to get local media", err);
//   }
// };
