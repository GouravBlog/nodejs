import express from "express";
import http from "http";
const port = 1000;
import { Server } from "socket.io";
import cors from 'cors'
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
}); //circuit

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    })
) // middleware

app.use(cookieParser())
// let user = true;

let sercretKey = "aklsdjesbdjkbaeujcbikdsbfjwefkcjb";


io.use((socket, next) => {
    cookieParser()(socket.request, socket.request.res, (err) => {
        if (err) return next(err);

        let token = socket.request.cookies.token

        console.log("token", token)

        if (!token) return next(new Error("Authentication Error"))

        let docode = jwt.verify(token, sercretKey)

        next();
    })
})


app.get("/login", async (req, res) => {
    let token = jwt.sign({ foo: 'bar' }, sercretKey);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }).json({
        message: "Login Succesfully"
    });


})




io.on("connection", (socket) => {
    //console.log(`welcome to the server`, socket.id); // message sent to all socket
    // io.emit("welcome", "welcome to the my first server message");

    socket.emit('welcome', 'welocme to the server');

    // socket.on("message", (data) => {
    //     // io.emit("received-message", data);  // data sent to all circuit
    //     socket.broadcast.emit("received-message", data);
    // })

    socket.on("join-room", (room) => {
        console.log(`${socket.id} is join ${room} room`);
        socket.join(room);
    })

    socket.on("message", ({ room, message }) => {
        socket.to(room).emit("received-message", message); // one to one chat connection
    })

    // socket.on("disconnect", () => {
    //     console.log('user is disconnect');
    // })
});




server.listen(port, () => {
    console.log(`server ie runnig at port no. ${port}`);
});