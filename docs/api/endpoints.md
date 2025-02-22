# API Reference

## Backend Endpoints

### Authentication
`POST /login`
- Authenticates users
- Returns JWT token
- Initializes game session

### Flag Verification
`POST /api/flag`
- Validates submitted flags
- Updates user scores
- Returns verification status

## WebSocket Events

### Client -> Server
- `start-game`: Initiates game session
- `send-flag`: Submits flag for verification
- `new-user-logged-in`: Notifies of new user connection

### Server -> Client
- `restore-session`: Sends current session state
- `game-started`: Notifies game start
- `update-game-state`: Broadcasts game state changes
- `send-result`: Returns flag verification results
