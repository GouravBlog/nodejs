import express from "express";
import http from "http";
const port = 1000;
import { Server } from "socket.io";
import cors from 'cors'

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5174",
        methods: ["GET", "POST"],
        credentials: true
    }
}); //circuit

app.use(
    cors({
        origin: "http://localhost:5174",
        methods: ["GET", "POST"],
        credentials: true
    })
)

io.on("connection", (socket) => {
    //console.log(`welcome to the server`, socket.id); // message sent to all socket

    // io.emit("welcome", "welcome to the my first server message");

    socket.on("message", (data) => {
        io.emit("received-message", data);
    })

    // socket.on("disconnect", () => {
    //     console.log('user is disconnect');
    // })
});

server.listen(port, () => {
    console.log(`server ie runnig at port no. ${port}`);
});