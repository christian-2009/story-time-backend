import express, { Express, Request, response, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import harperSaveMessage from "./services/harperSaveMessage";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//cors middleware
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

let chatRoom = "";
const allUsers: allUsersType[] = [];

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
  socket.on("send_message", (data: ClientToServerDataInterface) => {
    const { message, username, room, createdTime } = data;
    io.in(room).emit("receive_message", data);
    harperSaveMessage({ message, username, room, createdTime })
      ?.then((response) => console.log(`[cs] response`, response))
      .catch((error) => console.log(`[cs] error`, error));
  });
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
