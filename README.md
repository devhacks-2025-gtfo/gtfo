# GTFO (Get The Flag with Opponents)

A real-time competitive black box pentesting platform built for .devHacks 2025. Players compete to solve security challenges and capture flags in a time-boxed environment.

## 🎯 Features

- **Real-time Competition**: Live scoring and flag verification system
- **Dynamic Challenges**: Randomly selected security challenges from a challenge pool
- **WebSocket Integration**: Real-time game state updates and scoring
- **Security Focused**: Includes various security challenges like:
  - SQL Injection
  - Authentication Bypass
  - API Security

## 🏗️ Architecture

The application is split into three main components:

- **Backend (8000)**: Node.js/TypeScript server handling game logic and WebSocket
- **Frontend (5173)**: React/TypeScript client for game interface
- **Webgen (4000)**: Challenge generation and template system

## 🚀 Quick Start

1. **Prerequisites**
   - Node.js (v20.18.0 or higher)
   - npm (latest version)
   - Git

2. **Clone and Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/devhacks-2025-gtfo/gtfo.git
   cd gtfo

   # Install dependencies for all components
   cd backend && npm install
   cd ../frontend && npm install
   cd ../webgen && npm install
   ```

3. **Environment Setup**
   ```bash
   # backend/.env
   PORT=8000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret

   # frontend/.env
   VITE_API_URL=http://localhost:8000
   VITE_WEBGEN_URL=http://localhost:4000

   # webgen/.env
   PORT=4000
   BACKEND_URL=http://localhost:8000
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev

   # Terminal 3 - Webgen
   cd webgen
   npm run build && npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - Webgen: http://localhost:4000

## 📚 Documentation

- [Getting Started Guide](docs/setup/getting-started.md)
- [Architecture Overview](docs/architecture/overview.md)
- [API Reference](docs/api/endpoints.md)
- [Component Documentation](docs/components/)

## 🛠️ Tech Stack

### Backend
- Node.js with Express
- Socket.IO for real-time
- TypeScript
- JWT authentication
- Redis for sessions

### Frontend
- React with Vite
- TypeScript
- Radix UI components
- Socket.IO client
- TailwindCSS

### Webgen
- Express.js
- React components
- TypeScript
- Webpack
- Template system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Team

Built with ❤️ for .devHacks 2025 by:
- [Luke Wiebe](https://github.com/lukewiebe)
- [James Ha](https://github.com/Khoagoodkid)
- [James Park](https://github.com/KannaKim)
- [Paul Xiang](https://github.com/CompilingError)
- [Peter Vu](https://github.com/pieberrykinnie)