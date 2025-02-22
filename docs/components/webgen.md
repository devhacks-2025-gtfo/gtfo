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
  - Interactive React component
  - Solution description
  - Points value

### Template System
- Social Media template with designated slots for challenges
- Each slot specifies allowed challenge types
- Dynamic layout generation based on selected challenges
- React-based component architecture
- Real-time template updates

### Challenge Endpoints

#### Authentication Challenge
- `POST /api/login`: Authentication bypass challenge
- Validates SQL injection attempts
- Integrates with backend flag system
- Returns success status and flag

#### XSS Challenge
- `POST /api/search`: XSS vulnerability challenge
- Processes search queries
- Detects script injection
- Returns flag on successful execution

#### IDOR Challenge
- `GET /api/profile/:id`: IDOR vulnerability challenge
- Validates profile access permissions
- Detects unauthorized access attempts
- Returns flag on successful exploitation

#### CSRF Challenge
- `POST /api/posts/:id/like`: CSRF vulnerability challenge
- Processes like requests
- Validates request origin
- Returns flag on successful CSRF

### Game Generation
- `GET /api/new-game`: Creates new game instance
- Randomly selects challenges
- Generates game layout
- Maps challenges to template slots

### Backend Integration
- Fetches flags from backend API
- Maps challenge IDs to flag indices
- Validates challenge completion
- Real-time score updates

## Technical Architecture

### Server
- Express.js backend
- TypeScript for type safety
- WebSocket integration
- API endpoint handlers
- Challenge validation logic

### Client
- React components
- Webpack bundling
- Template rendering
- Challenge interactions
- Real-time updates

### Templates
- Component-based design
- Slot-based challenge placement
- Dynamic layout system
- Responsive design

## Development

### Project Structure
```
webgen/
├── src/
│   ├── challenges/    # Challenge implementations
│   ├── templates/     # Layout templates
│   ├── client/       # React client code
│   ├── game/         # Game logic
│   ├── types/        # TypeScript definitions
│   └── display.ts    # Main server
```

### Build System
- TypeScript compilation
- Webpack bundling
- Development hot reload
- Production optimization

### Testing
- Jest test framework
- Component testing
- API endpoint tests
- Integration tests

## Security Considerations

### Challenge Security
- Server-side validation
- Input sanitization
- Rate limiting
- Error handling

### Flag Protection
- No client-side storage
- Secure flag transmission
- Session-based validation
- Backend verification

### Communication Security
- HTTPS in production
- WebSocket security
- API authentication
- CORS configuration

## Configuration

### Environment Variables
```env
PORT=4000
BACKEND_URL=http://localhost:8000
NODE_ENV=development
```

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## API Reference

### Game Management
- `GET /api/new-game`: Generate new game
- `GET /api/current-game`: Get current game state

### Challenge Endpoints
- `POST /api/login`: Auth challenge
- `POST /api/search`: XSS challenge
- `GET /api/profile/:id`: IDOR challenge
- `POST /api/posts/:id/like`: CSRF challenge