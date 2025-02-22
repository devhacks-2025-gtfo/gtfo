# Frontend Component

## Overview
React-based user interface handling game interaction and real-time updates.

## Key Components

### Game Component
Main game interface handling:
- User authentication
- Score display
- Flag submission
- Real-time updates

Reference:
```typescript:frontend/src/pages/Game.tsx
startLine: 29
endLine: 91
```

### Clock Component
Countdown timer showing remaining game time:
```typescript:frontend/src/components/Clock.tsx
startLine: 12
endLine: 34
```

## State Management
- Uses React hooks for local state
- WebSocket connection for real-time updates
- Session persistence through cookies