import React, { use, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Clock from "../components/Clock";
import ScoreCard from "../components/ScoreCard";
import { Flex, Box, TextField, Button } from "@radix-ui/themes";
import { v4 as uuidv4 } from "uuid";
import Home from "./Home";
import { ToastContainer, toast } from "react-toastify";

interface User {
  userId: string;
  score: number;
}

interface Session {
  userId: string;
  score: number;
}

interface RestoreSessionData {
  session: Session;
  gameState: GameState;
}

interface GameState {
  scores: Record<string, number>;
  endTime: number;
  isGameStarted: boolean;
  ready: string[];
}

const socket = io("http://localhost:8000", { withCredentials: true });

export default function Game() {
  const [session, setSession] = useState<Session | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [users, setUsers] = useState<Record<string, User> | null>(null);
  const [flag, setFlag] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [opponentId, setOpponentId] = useState<string>("");
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  // Handle Login
  const startGame = async () => {
    if (!session) {
      const userId = uuidv4();

      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
        credentials: "include", // Sends cookies
      });
      const data = await res.json();

      if (data.userId) {
        console.log(data.userId);
        setUserId(data.userId);
        setSession({ userId: data.userId, score: 0 });
        setUsers(data.users);
        socket.connect();
        socket.emit("ready-signal", { userId: data.userId });
        socket.emit("new-user-logged-in", { userId: data.userId });
      }
    } else {
      socket.emit("ready-signal", { userId: userId });
    }
  };

  // Get Session on Load
  useEffect(() => {
    socket.on("update-game-state", (newGameState: GameState) => {
      if (newGameState.isGameStarted) {
        setIsGameStarted(true);
      }
      setGameState(newGameState);
    });

    // socket.on("game-started", (gameState: GameState) => {
    //     if (!isGameStarted) {
    //         setGameState(gameState)
    //         startGame()
    //         setIsgameStarted(true)
    //     }
    // })

    socket.on("restore-session", (userSession: RestoreSessionData) => {
      console.log("Session Restored:", userSession);
      setSession(userSession.session);
      console.log(userSession.gameState);
      setGameState(userSession.gameState);
    });

    socket.on("send-result", (result) => {
      const { senderId, isCorrect, message, gameState } = result;

      // when the sender is the current user
      console.log({ senderId, userId });
      if (senderId == userId) {
        toast(message);
        console.log(gameState.scores);
      }
      setGameState(gameState);
    });
    // return () => {
    //     socket.off("restore-session");
    // };
  }, []);

  // Update Score in WebSocket
  const sendFlag = (e: any) => {
    e.preventDefault();
    console.log(flag);
    socket.emit("send-flag", {
      senderId: session?.userId,
      flag: flag,
    });
    setFlag("");
  };

  useEffect(() => {
    if (gameState && !opponentId) {
      const opponentId = Object.keys(gameState.scores).filter(
        (id) => id !== session?.userId,
      )[0];
      setOpponentId(opponentId);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState && gameState.isGameStarted && isGameEnded) {
      endGameSignal();
    }
  }, [isGameEnded, gameState]);

  const endGameSignal = () => {
    const score = session && gameState ? gameState?.scores[session.userId] : 0;
    const opponentScore = gameState?.scores[opponentId] || 0;

    if (score > opponentScore) {
      toast("You Won!");
    } else if (score < opponentScore) {
      toast("You Lost!");
    } else {
      toast("It's a tie!");
    }
  };

  const restartGame = () => {
    setIsGameStarted(false);
    setIsGameEnded(false);

    socket.emit("restart-game", gameState);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", background: "none" }}>
      <ToastContainer />
      {!session || !isGameStarted ? (
        <>
          {!isConnected ? (
            <Home connected={isConnected} setConnected={setIsConnected} />
          ) : (
            <>
              <h1>JWT WebSocket + Cookies</h1>
              <Button onClick={startGame}>Ready</Button>
              {session && gameState?.ready.includes(session?.userId) && (
                <span>Waiting for other players...</span>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Flex
            direction="column"
            align="center"
            justify="between"
            height="90vh"
          >
            <Flex justify="center" align="center" gap={"9"}>
              {gameState && (
                <Clock
                  time={gameState?.endTime}
                  endGameSignal={endGameSignal}
                  isGameEnded={isGameEnded}
                  setIsGameEnded={setIsGameEnded}
                />
              )}
            </Flex>
            <Flex
              justify="center"
              align="center"
              gap={"3"}
              style={{ marginBottom: "5em" }}
            >
              <input
                id="textField"
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="Paste your flag..."
                style={{
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  color: "black",
                  fontSize: "1.3em",
                }}
              />
              <Button onClick={sendFlag} disabled={isGameEnded} asChild>
                <Box width="150px" height="66px" style={{ fontSize: "1.3em" }}>
                  Submit
                </Box>
              </Button>
            </Flex>

            <Flex
              justify="between"
              width="100vw"
              position="fixed"
              inset="0px"
              p="8"
              style={{ zIndex: "-1", background: "var(--gray-3)", }}
            >
              <ScoreCard
                score={gameState?.scores[session.userId] || 0}
                title="My Score"
              />
              <Box />
              <ScoreCard
                score={gameState?.scores[opponentId] || 0}
                title="Opponent's Score"
              />
            </Flex>

            <a href="http://localhost:4000" target="_blank">
              <Button asChild size="3">
                <Box height="66px" width="250px" style={{ fontSize: "1.3em", whiteSpace: "nowrap" }}>
                  Open Target Page 🎯
                </Box>
              </Button>
            </a>

            {isGameEnded && (
              <Button
                asChild
                size="3"
                onClick={restartGame}
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                <Box width="170px" height="66px">
                  Restart Game
                </Box>
              </Button>
            )}
          </Flex>
        </>
      )}
    </div>
  );
}
