import React, { useState } from "react";

function Room({ joinRoom }) {
    const [room, setRoom] = useState("");

    const handleJoinRoom = () => {
        if (room.trim()) {
            joinRoom(room);
        }
    };

    return (
        <div>
            <h2>Enter a Room ID to Join</h2>
            <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Room ID"
            />
            <button onClick={handleJoinRoom}>Join Room</button>
        </div>
    );
}

export default Room;
