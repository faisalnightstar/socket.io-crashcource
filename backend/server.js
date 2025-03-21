const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("What is socket: " + socket);
    console.log("Socket is active to be connected...");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("chat", (payload) => {
        console.log("What is payload: " + payload);
        console.log(
            "message: " + payload.message,
            "username: " + payload.username
        );
        io.emit("chat", payload);
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
