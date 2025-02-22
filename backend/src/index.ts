import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';


interface User {
  userId: string;
  score: number;
}

interface JwtPayload {
  userId: string;
  username: string;
}
interface Flag {
  flag: string;
  isVerified: boolean;
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
const socketIds: any = {};
const gameState: any = {
  scores: {},
  endTime: 0
}

const JWT_SECRET = process.env.JWT_SECRET as string || "51760344b6553a01fd2ea990f36a81d0c26c0a464998fd8dcbe7f70db88add23";

// 🎯 **User Login Endpoint (Issues JWT in Cookie)**
app.post("/login", (req: any, res: any) => {
  const { userId } = req.body;


  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true, sameSite: "Strict" });
  users[userId] = { userId, score: 0 };
  gameState.scores[userId] = 0;
  res.json({ message: "Login successful", userId, gameState });
});

app.post("/api/flag", (req: any, res: any) => {
  const { id } = req.body;    

  res.json({ flag: flags[id] });
})


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
const flags: Flag[] = []


// 🎯 **WebSocket Connection Handling**
io.on("connection", (socket: Socket) => {
  const { userId, } = socket.data.user as JwtPayload;

  socketIds[userId] = socket.id;
  console.log(`${userId} connected`);

  if (!sessions[userId]) {
    sessions[userId] = { userId, score: 0 };
  }

  socket.emit("restore-session", {
    session: sessions[userId],
    gameState,
  });

  socket.on("new-user-logged-in", (data: { userId: string }) => {
    console.log("New user logged in:", data.userId);
    io.emit("update-game-state", gameState);
  });


  socket.on("start-game", () => {
    gameState.endTime = Date.now() + 60000;
    io.emit("game-started", gameState);

    for (let i = 0; i < 100; i++) {
      flags.push({
        flag: uuidv4().toString(),
        isVerified: false
      });
    }
    console.log(flags)
  })
  socket.on("send-flag", (playerObj) => {
    const { userId, flag } = playerObj;
    // console.log(flags)

    const index = flags.findIndex((f) => f.flag === flag);
    console.log(index)
    if (index != -1) {
      if (flags[index].isVerified) {
        io.emit("send-result", {
          userId,
          isCorrect: false,
          message: "Flag already verified",
          gameState
        })
      } else {
        gameState.scores[userId] = (gameState.scores[userId] || 0) + 1;
        io.emit("send-result", {
          userId,
          isCorrect: true,
          message: "Correct Flag!",
          gameState
        })

        flags[index].isVerified = true;
      }
    } else {  
      io.emit("send-result", {
        userId,
        isCorrect: false,
        message: "Incorrect Flag!",
        gameState
      })
    }
    console.log(gameState)


  })


  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected`);
  });
});

const PORT = 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
