import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

// const socket = io('http://localhost:8080/');

const ContextProvider = ({ children }) => {
    // const [stream, setStream] = useState('');
    // const [socketID, setSocketID] = useState('');
    // const [call, setCall] = useState('');
    // const [callAccepted, setCallAccpeted] = useState(false);
    // const [callEnded, setCallEnded] = useState(false);
    // const [name, setName] = useState('');

    // const myVideo = useRef();
    // const userVideo = useRef();
    // const connectionRef = useRef();
    //open camera and microphone
    // useEffect(() => {
    //     navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    //         .then((currentStream) => {
    //             setStream(currentStream);
    //             myVideo.current.srcObject = currentStream;


    //         });

    //     socket.on('MY_SOCKET_ID', socketId => {
    //         setSocketID(socketId);
    //     })
    //     socket.on("callUser", ({ from, name: callerName, signal }) => {
    //         setCall({
    //             isRecievedCall: true,
    //             from,
    //             name: callerName,
    //             signal,
    //         })
    //     })
    // }, []);

    // const callUserStart = (id) => {
    //     console.log("goi dien", id);
    //     const peer = new Peer({ initiator: true, trickle: false, stream: stream });
    //     peer.on("signal", (data) => {
    //         socket.emit("calluser", { userToCall: id, signalData: data, from: socketID, name });
    //     });
    //     // open stream
    //     peer.on('stream', (currentStream) => {
    //         myVideo.current.srcObject = currentStream;
    //     });
    //     socket.on("callaccepted", (signal) => {
    //         setCallAccpeted(true);
    //         peer.signal(signal);
    //     });
    //     connectionRef.current = peer;
    // }

    // const answerUser = () => {
    //     setCallAccpeted(true);
    //     const peer = new Peer({ initiator: false, trickle: false, stream: stream });
    //     peer.on("signal", (data) => {
    //         socket.emit("answercall", { signal: data, to: call.from });
    //     });
    //     peer.on("stream", (currentStream) => {
    //         myVideo.current.srcObject = currentStream;
    //     });

    //     peer.signal(call.signal);

    //     connectionRef.current = peer;

    // }

    // const leaveCall = () => {
    //     setCallEnded(true);
    //     connectionRef.current.destroy();
    //     window.location.reload();

    // }
    const testImport = () => {
        console.log("test thanh cong");
    }
    return (
        <SocketContext.Provider value={{
            // stream,
            // socketID,
            // call,
            // callAccepted,
            // callEnded,
            // name,
            // setName,
            // myVideo,
            // userVideo,
            // connectionRef,
            // answerUser,
            // callUserStart,
            // leaveCall,
            testImport
        }}
        >
            {children}

        </SocketContext.Provider>
    )

}
export { ContextProvider, SocketContext }