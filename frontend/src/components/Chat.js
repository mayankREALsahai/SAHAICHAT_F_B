import React, { useState, useEffect } from "react";

function Chat({ socket, room }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off("message");
    }, [socket]);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("message", { room, message });
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Room: {room}</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                <h3>Messages:</h3>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Chat;
