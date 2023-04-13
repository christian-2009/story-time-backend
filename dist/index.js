"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const harperSaveMessage_1 = __importDefault(require("./services/harperSaveMessage"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
//cors middleware
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
let chatRoom = "";
const allUsers = [];
io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        const { username, room } = data;
        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        const chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit("chatroom_users", chatRoomUsers);
        socket.emit("chatroom_users", chatRoomUsers);
        socket.join(room);
        const currentTime = Date.now();
        socket.emit("receive_message", {
            message: `Welcome ${username}`,
            username: "Chat",
            currentTime,
        });
        socket.to(room).emit("receive_message", {
            message: `${username} has joined the room`,
            username: "Chat",
            currentTime,
        });
    });
    socket.on("send_message", (data) => {
        var _a;
        const { message, username, room, createdTime } = data;
        io.in(room).emit("receive_message", data);
        (_a = (0, harperSaveMessage_1.default)({ message, username, room, createdTime })) === null || _a === void 0 ? void 0 : _a.then((response) => console.log(`[cs] response`, response)).catch((error) => console.log(`[cs] error`, error));
    });
});
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
