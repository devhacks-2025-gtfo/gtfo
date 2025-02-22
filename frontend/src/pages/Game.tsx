import React, { use, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Clock from "../components/Clock";
import ScoreCard from "../components/ScoreCard";
import { Flex, Box, } from "@radix-ui/themes";
import { v4 as uuidv4 } from 'uuid';
import Home from "./Home";
import { ToastContainer, toast } from 'react-toastify';
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
    gameState: GameState
}

interface GameState {
    scores: Record<string, number>;
    endTime: number;
    isGameStarted: boolean;
    ready: string[]
}

const socket = io("http://localhost:8000", { withCredentials: true });

export default function Game() {
    const [session, setSession] = useState<Session | null>(null);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [users, setUsers] = useState<Record<string, User> | null>(null);
    const [flag, setFlag] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [opponentId, setOpponentId] = useState<string>("");
    const [isGameStarted, setIsgameStarted] = useState<boolean>(false);
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
                console.log(data.userId)
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
                setIsgameStarted(true)
            }
            setGameState(newGameState)
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
            console.log(userSession.gameState)
            setGameState(userSession.gameState);
        });

        socket.on("send-result", (result) => {
            const { senderId, isCorrect, message, gameState } = result

            // when the sender is the current user
            console.log({ senderId, userId })
            if (senderId == userId) {
                toast(message)
                console.log(gameState.scores)
            }
            setGameState(gameState)
        });
        // return () => {   
        //     socket.off("restore-session");
        // };
    }, []);

    // Update Score in WebSocket
    const sendFlag = (e: any) => {
        e.preventDefault();
        console.log(flag)
        socket.emit("send-flag", {
            senderId: session?.userId,
            flag: flag

        });
        setFlag("")
    }


    useEffect(() => {
        if (gameState && !opponentId) {
            const opponentId = Object.keys(gameState.scores).filter((id) => id !== session?.userId)[0];
            setOpponentId(opponentId);
        }


    }, [gameState]);

    useEffect(() => {
        if(gameState && gameState.isGameStarted && isGameEnded) {
            endGameSignal();
        }
    },[isGameEnded, gameState])

    const endGameSignal = () => {
        const score = session && gameState ? (gameState?.scores[session.userId] ) : 0;
        const opponentScore =  gameState?.scores[opponentId] || 0;

        if(score > opponentScore){ 
            toast("You Won!")
        } else if(score < opponentScore){
            toast("You Lost!")
        }   else {   
            toast("It's a tie!")      
        }
    }

    const restartGame = () => {
        setIsgameStarted(false);
        setIsGameEnded(false);


        socket.emit("restart-game", gameState)

    }


    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <ToastContainer />
            {!session || !isGameStarted ? (
                <>
                    {/* this should go in Home.tsx */}
                    {!isConnected ? <Home connected={isConnected} setConnected={setIsConnected} /> :
                        <>
                            <h1>JWT WebSocket + Cookies</h1>
                            <button onClick={startGame}>Ready</button>
                            {session && gameState?.ready.includes(session?.userId) && <span>Waiting for other players...</span>}
                        </>}
                </>
            ) : (
                <>
                    <Flex justify="center" align="center" gap={"9"}>
                        {/* TODO: endTime is 0 on a fresh session */}
                        {/* TODO: sometimes the clock produces NaNs even when endTime is valid */}
                        {gameState && <Clock time={gameState?.endTime} endGameSignal={endGameSignal} isGameEnded = {isGameEnded} setIsGameEnded = {setIsGameEnded} />}
                    </Flex>
                    <Flex justify="center" align="center" gap={"3"} style={{ marginBottom: "5em" }}>

                        <input
                            id="textField"
                            type="text"
                            value={flag}
                            onChange={(e) => setFlag(e.target.value)}
                            placeholder="Type your flag..."
                            style={{
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                color: "black",
                            }}
                        />
                        <button
                            onClick={sendFlag}
                            style={{
                                padding: "10px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >        Submit
                        </button>
                    </Flex>

                    <Flex justify="center" width="100vw" gap="9">
                        {gameState && <ScoreCard score={gameState?.scores[session.userId]} title="My Score" />}
                        <Box />
                        <ScoreCard score={gameState?.scores[opponentId] || 0} title="Opponent's Score" />
                    </Flex>

                    {isGameEnded && <button
                        onClick={restartGame}
                        style={{
                            padding: "10px",
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >        Restart Game
                    </button>}


                </>
            )}
        </div>
    );
}
