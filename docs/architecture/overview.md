# Architecture Overview

GTFO is a distributed system composed of four main components:

## Components

1. **Backend (Port 8000)**
   - Core game logic
   - WebSocket server for real-time communication
   - Flag generation and verification
   - User session management

2. **Frontend (Port 5173)**
   - React-based user interface
   - Real-time score display
   - Game state management
   - Player interaction

3. **Web Deploy (Port 3000)**
   - Challenge deployment system
   - Dynamic problem loading
   - SQLite database integration

4. **Webgen (Port 4000)**
   - Challenge selection system
   - Problem rotation
   - Dynamic content serving

## Technology Stack

- Backend: Node.js, Express, Socket.IO, TypeScript
- Frontend: React, Vite, TypeScript, Radix UI
- Web Deploy: Next.js, SQLite
- Webgen: Express, Node.js 