import express from 'express';
const app = express();
import cors from 'cors';
import http from 'http';
const port = 2000;
import { Server } from 'socket.io';

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['POST', 'GET'],
        credentials: true
    }
});

app.use(cors({
    origin: "*",
    methods: ['POST', 'GET'],
    credentials: true
}));

let users = [{}];

io.on("connection", (socket) => {
    console.log('Circit Connected');

    socket.on("join-user", (data) => {
        users[socket.id] = data.user;
        console.log(`${users[socket.id]} is connectd`);
        socket.emit("welcome", { message: `${users[socket.id]} Welcome to the chat` });
        socket.broadcast.emit("sendtobordcast", { message: `${users[socket.id]} has join` });
    });

    socket.on("send-message", ({ message, id }) => {
        io.emit("send-to-message", { user: users[id], message, id })
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnect", { message: `${users[socket.id]} has left` });
        console.log(`${users[socket.id]} has left`)
    })
})


server.listen(port, () => {
    console.log(`server is run port no. ${port}`);
});
