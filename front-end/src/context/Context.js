// import React, { createContext, useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';

// const SocketContext = createContext();

// const socket = io('ws://localhost:4001');

// function ContextProvider({ children }) {
//   const [stream, setStream] = useState(null);
//   const [me, setMe] = useState('');
//   const [call, setCall] = useState({});
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [name, setName] = useState('');

//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((currentStream) => {
//         console.log('Media stream obtained:', currentStream);
//         setStream(currentStream);
//         myVideo.current.srcObject = currentStream;
//         return currentStream; // Retourne la valeur pour la prochaine étape de la chaîne
//       })
//       .catch((error) => {
//         console.error('Error getting user media:', error);
//         // Gérez l'erreur ici, par exemple, affichez un message à l'utilisateur
//         throw error; // Lance l'erreur pour la gestion ultérieure des erreurs
//       });

//     socket.on('me', (id) => setMe(id));

//     socket.on('calluser', ({ from, name: callerName, signal }) => {
//       setCall({ isRecievedCall: true, from, name: callerName, signal });
//     });

//     console.log('Component re-rendered with stream:', stream);
//   }, []);

//   const answerCall = () => {
//     setCallAccepted(true);

//     const peer = new Peer({ initiator: false, trickle: false, stream });

//     peer.on('signal', (data) => {
//       socket.emit('answercall', { signal: data, to: call.from });
//     });

//     peer.on('stream', (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     });

//     peer.signal(call.signal);

//     connectionRef.current = peer;
//   };

//   const callUser = (id) => {
//     const peer = new Peer({ initiator: true, trickle: false, stream });

//     peer.on('signal', (data) => {
//       socket.emit('calluser', {
//         userToCall: id,
//         signalData: data,
//         from: me,
//         name,
//       });
//     });

//     peer.on('stream', (currentStream) => {
//       userVideo.current.srcObject = currentStream;
//     });

//     socket.on('callaccepted', (signal) => {
//       setCallAccepted(true);

//       peer.signal(signal);
//     });

//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);
//     connectionRef.current.destroy();
//     // window.location.reload();
//   };

//   return (
//     <SocketContext.Provider
//       value={{
//         call,
//         callAccepted,
//         myVideo,
//         userVideo,
//         stream,
//         name,
//         setName,
//         callEnded,
//         me,
//         callUser,
//         leaveCall,
//         answerCall,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export { ContextProvider, SocketContext };
