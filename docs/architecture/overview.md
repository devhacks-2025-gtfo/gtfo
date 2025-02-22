# Architecture Overview

GTFO is a distributed system composed of three main components:

## Components

1. **Backend (Port 8000)**
   - Core game logic and state management
   - WebSocket server for real-time communication
   - Flag generation and verification
   - User session management
   - Challenge validation and scoring
   - Real-time game state updates

2. **Frontend (Port 5173)**
   - React-based user interface
   - Real-time score display
   - Game state management
   - Challenge interaction interface
   - WebSocket client for live updates
   - Responsive design for all devices

3. **Webgen (Port 4000)**
   - Challenge generation and template system
   - Dynamic challenge selection
   - Template-based layout generation
   - Flag integration with backend
   - Challenge validation endpoints
   - Real-time challenge updates

## Technology Stack

### Backend
- Node.js with Express
- Socket.IO for real-time communication
- TypeScript for type safety
- JWT for authentication
- Redis for session management

### Frontend
- React with Vite
- TypeScript
- Radix UI for components
- Socket.IO client
- React Router for navigation
- TailwindCSS for styling

### Webgen
- Express.js server
- React for challenge components
- TypeScript
- Webpack for bundling
- Template-based architecture

## Communication Flow

1. **Game Initialization**
   - Backend creates game session
   - Webgen generates challenge layout
   - Frontend displays game interface

2. **Challenge Interaction**
   - User interacts with challenges
   - Webgen validates attempts
   - Backend verifies flags
   - Real-time updates via WebSocket

3. **Scoring and Progress**
   - Backend tracks scores
   - Frontend updates in real-time
   - Webgen manages challenge state

## Security Architecture

- JWT-based authentication
- Secure WebSocket connections
- Server-side flag validation
- Rate limiting on endpoints
- XSS and CSRF protection 