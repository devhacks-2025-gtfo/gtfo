# Backend Component

## Overview
The backend server handles game logic, WebSocket connections, flag generation and verification, and session management.

## Core Features

### Session Management
- JWT-based authentication
- Cookie-based session persistence
- User state tracking

### WebSocket Implementation
References:
```typescript:backend/src/index.ts
startLine: 91
endLine: 167
```

### Flag System
- Generates 100 unique flags using UUID
- Tracks flag verification status
- Prevents duplicate flag submissions

## API Endpoints

### POST /login
- Authenticates users
- Issues JWT tokens
- Initializes user score

### POST /api/flag
- Validates flag submissions
- Updates game state
- Returns flag verification status