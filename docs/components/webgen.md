# Webgen Component

## Overview
Challenge generation and template serving system for GTFO. Webgen handles the dynamic generation of challenge layouts and integration with the backend's flag system.

## Core Functionality

### Challenge Management
- Maintains a pool of security challenges:
  - SQL Injection (Authentication Bypass)
  - Cross-Site Scripting (XSS)
  - Insecure Direct Object References (IDOR)
  - Cross-Site Request Forgery (CSRF)
- Each challenge includes:
  - Unique identifier
  - Type and difficulty
  - Interactive component
  - Solution description

### Template System
- Social Media template with designated slots for challenges
- Each slot specifies allowed challenge types
- Dynamic layout generation based on selected challenges

### Flag Integration
- Fetches flags from backend's `/api/flag` endpoint
- Maps challenge IDs to flag indices (0-2)
- Includes flags in successful challenge completion responses

## API Endpoints

### Game Generation
- `GET /api/new-game`: Generates a new game with random template and challenges
- `GET /api/current-game`: Returns the current game state

### Challenge Endpoints
- `POST /api/login`: Authentication bypass challenge
- `POST /api/search`: XSS challenge
- `GET /api/profile/:id`: IDOR challenge
- `POST /api/posts/:id/like`: CSRF challenge

Each challenge endpoint returns:
```json
{
  "success": boolean,
  "message": string,
  "flag": string (only on successful completion)
}
```

## Configuration
- Server runs on port 4000
- Requires backend server on port 8000 for flag generation
- Uses React for challenge components
- Webpack for client-side bundling

## Dependencies
- Express.js for server
- React for UI components
- TypeScript for type safety
- Webpack for bundling

## Component Structure
```
webgen/
├── src/
│   ├── challenges/         # Challenge implementations
│   ├── templates/          # Layout templates
│   ├── client/            # Client-side React code
│   ├── game/              # Game generation logic
│   ├── types/             # TypeScript definitions
│   └── display.ts         # Main server file
```

## Components to Prune
1. Remove `/api/generate` endpoint (unused HTML file generation)
2. Remove `flag` property from Challenge interface (now fetched from backend)
3. Remove `validateFlag` functionality (handled by backend)
4. Remove web-deploy integration (challenges served directly)