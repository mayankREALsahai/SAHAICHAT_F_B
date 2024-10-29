import React, { useState } from "react";
import io from "socket.io-client";
import Room from "./components/Room";
import Chat from "./components/Chat";

const socket = io("https://sahaithechat-backend.onrender.com");  // Connect to backend server

function App() {
    const [room, setRoom] = useState("");

    const joinRoom = (roomId) => {
        setRoom(roomId);
        socket.emit("joinRoom", roomId);
    };

    return (
        <div>
            {!room ? (
                <Room joinRoom={joinRoom} />
            ) : (
                <Chat socket={socket} room={room} />
            )}
        </div>
    );
}

export default App;
