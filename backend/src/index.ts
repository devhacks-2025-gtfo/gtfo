import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";

interface User {
  username: string;
  score: number;
}

interface JwtPayload {
  userId: string;
  username: string;
}

type Sessions = Record<string, User>;
type Users = Record<string, User>;



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

const users: Users = {};
const sessions: Sessions = {};
const JWT_SECRET = process.env.JWT_SECRET as string || "51760344b6553a01fd2ea990f36a81d0c26c0a464998fd8dcbe7f70db88add23";

// 🎯 **User Login Endpoint (Issues JWT in Cookie)**
app.post("/login", (req: any, res: any) => {
  const { username } = req.body;

  if (!username) return res.status(400).json({ error: "Username is required" });

  const userId = `user_${Math.floor(Math.random() * 10000)}`;
  const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true, sameSite: "Strict" });
  users[userId] = { username, score: 0 };

  res.json({ message: "Login successful", username, users });
});

// 🎯 **JWT Middleware for WebSocket Authentication**
io.use((socket: Socket, next) => {
  const cookieHeader = socket.handshake.headers.cookie;
  if (!cookieHeader) return next(new Error("No cookies found"));

  const cookies: Record<string, string> = Object.fromEntries(cookieHeader.split("; ").map(c => c.split("=")));
  if (!cookies.token) return next(new Error("No token found"));

  jwt.verify(cookies.token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new Error("Invalid token"));

    socket.data.user = decoded as JwtPayload;
    next();
  });
});

// 🎯 **WebSocket Connection Handling**
io.on("connection", (socket: Socket) => {
  const { userId, username } = socket.data.user as JwtPayload;
  console.log(socket.data.user)
  console.log(`${userId} connected as ${username}`);

  if (!sessions[userId]) {
    sessions[userId] = { username, score: 0 };
  }

  socket.emit("restore-session", {
    session: sessions[userId],
    users,
  });

  socket.on("new-user-logged-in", (data: { username: string }) => {
    console.log("New user logged in:", data.username);
    io.emit("restore-session", {
      session: sessions[userId],
      users,
    });
  });



  socket.on("update-score", (newScore: number) => {
    if (sessions[userId]) {
      console.log(`${userId} is available`);
      sessions[userId].score = newScore;
      socket.emit("score-updated", newScore);
    } else {
      console.log(`${userId} is not available`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User ${username} (${userId}) disconnected`);
  });
});

const PORT = 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
