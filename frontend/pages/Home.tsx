import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

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
}

const socket = io("http://localhost:8000", { withCredentials: true });

function Home() {
    const [session, setSession] = useState<Session | null>(null);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [users, setUsers] = useState<Record<string, User> | null>(null);
    const [flag, setFlag] = useState<string>("");
    // Handle Login
    const handleLogin = async () => {
        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
            credentials: "include", // Sends cookies
        });
        const data = await res.json();
        console.log(data)
        if (data.userId) {
            setSession({ userId: data.userId, score: 0 });
            setUsers(data.users);
            socket.connect();
            socket.emit("start-game")
            socket.emit("new-user-logged-in", { userId: data.userId });
        }
    };

    // Get Session on Load
    useEffect(() => {
        socket.on("update-game-state", (newUsers: Record<string, User>) => {
            setGameState(gameState)
        });

        socket.on("restore-session", (userSession: RestoreSessionData) => {
            console.log("Session Restored:", userSession);
            setSession(userSession.session);
            console.log(userSession.gameState)
            setGameState(userSession.gameState);
        });

        socket.on("send-result", (result) => {
            const { senderId, isCorrect, message, gameState } = result

            // when the sender is the current user
            if (senderId == session?.userId) {
                console.log(message)
                console.log(gameState.scores)
                setGameState(gameState)
            }
        });
        // return () => {   
        //     socket.off("restore-session");
        // };
    }, []);

    // Update Score in WebSocket
    const sendFlag = (e) => {
        e.preventDefault();
        console.log(flag)
        socket.emit("send-flag", {
            userId: session?.userId,
            flag: flag

        });
    }
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>JWT WebSocket + Cookies</h1>
            {!session ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </>
            ) : (
                <>
                    <h2>Welcome, {session.userId}</h2>
                    <div>
                        {users && Object.keys(users)?.map((userId) => (
                            <div key={userId}>{users[userId].userId}</div>
                        ))}
                    </div>
                    <h3>Score: {JSON.stringify(gameState?.scores[session.userId])}</h3>
                    <form onSubmit={sendFlag}>

                        <input onChange={(e) => setFlag(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default Home;
