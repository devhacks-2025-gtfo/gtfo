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

The application is split into four main components:

- **Backend (8000)**: Node.js/TypeScript server handling game logic and WebSocket
- **Frontend (5173)**: React/TypeScript client for game interface
- **Web Deploy (3000)**: Next.js application serving dynamic challenges
- **Webgen (4000)**: Challenge generation and selection system

## 🚀 Quick Start

1. Clone the repository:

```bash
git clone https://github.com/devhacks-2025-gtfo/gtfo.git
cd gtfo
```

2. Install dependencies for all components (see [setup guide](docs/setup/getting-started.md))

3. Start the development servers:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev 

# Terminal 3 - Web Deploy
cd web-deploy
npm run dev

# Terminal 4 - Webgen
cd webgen
node display.js
```

## 📚 Documentation

- [Getting Started Guide](docs/setup/getting-started.md)
- [Architecture Overview](docs/architecture/overview.md)
- [API Reference](docs/api/endpoints.md)
- [Component Documentation](docs/components/)

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, Socket.IO, TypeScript
- **Frontend**: React, Vite, TypeScript, Radix UI
- **Web Deploy**: Next.js, SQLite
- **Webgen**: Express, Node.js

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Team

Built with ❤️ for .devHacks 2025 by:
- [Luke Wiebe](https://github.com/lukewiebe)
- [James Ha](https://github.com/Khoagoodkid)
- [James Park](https://github.com/KannaKim)
- [Paul Xiang](https://github.com/CompilingError)
- [Peter Vu](https://github.com/pieberrykinnie)