import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io("http://localhost:3000");

const App = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const username = nanoid(4);

    console.log("What is chat", chat);

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit("chat", { message, username });
        setMessage("");
    };

    useEffect(() => {
        socket.on("chat", (payload) => {
            setChat([...chat, payload]);
        });
    }, [chat]);

    return (
        <div className="App">
            <h1>Chatty App</h1>
            {/* <div>
                {chat.map((item, index) => (
                    <div key={index}>
                        <p>{item.message}</p>
                    </div>
                ))}
            </div> */}
            {chat.map((payload, index) => (
                <div key={index}>
                    <p>{payload.message}</p>
                    <span>{payload.username}</span>
                </div>
            ))}
            <form onSubmit={sendChat}>
                <input
                    type="text"
                    name="chat"
                    placeholder="send msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default App;
