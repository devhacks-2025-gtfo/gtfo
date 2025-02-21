import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface User {
    username: string;
    score: number;
}

interface Session {
    username: string;
    score: number;
}

interface RestoreSessionData {
    session: Session;
    users: Record<string, User>;
}

const socket = io("http://localhost:8000", { withCredentials: true });

function Blank() {
    const [session, setSession] = useState<Session | null>(null);
    const [score, setScore] = useState<number>(0);
    const [username, setUsername] = useState<string>("");
    const [users, setUsers] = useState<Record<string, User> | null>(null);

    // Handle Login
    const handleLogin = async () => {
        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
            credentials: "include", // Sends cookies
        });

        const data = await res.json();
        if (data.username) {
            setSession({ username: data.username, score: 0 });
            setUsers(data.users);
            socket.connect();
            socket.emit("new-user-logged-in", { username: data.username });
        }
    };

    // Get Session on Load
    useEffect(() => {
        socket.on("restore-session", (userSession: RestoreSessionData) => {
            console.log("Session Restored:", userSession);
            setSession(userSession.session);
            setUsers(userSession.users)
            setScore(userSession.session.score);
        });

        socket.on("score-updated", (newScore: number) => {
            setScore(newScore);
        });

        // return () => {
        //     socket.off("restore-session");
        // };
    }, []);

    // Update Score in WebSocket
    const increaseScore = () => {
        socket.emit("update-score", score + 1);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>JWT WebSocket + Cookies</h1>
            {!session ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </>
            ) : (
                <>
                    <h2>Welcome, {session.username}</h2>
                    <div>
                        {users && Object.keys(users)?.map((userId) => (
                            <div key={userId}>{users[userId].username}</div>
                        ))}
                    </div>
                    <h3>Score: {score}</h3>
                    <button onClick={increaseScore}>Increase Score</button>
                </>
            )}
        </div>
    );
}

export default Blank;
