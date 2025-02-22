# Getting Started

## Prerequisites

- Node.js (v20.18.0 or higher)
- npm (latest version)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/devhacks-2025-gtfo/gtfo.git
cd gtfo
```

2. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Web Deploy
cd ../web-deploy
npm install

# Webgen
cd ../webgen
npm install
```

## Running the Application

Start each component in separate terminal windows:

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

The application should now be running with:
- Backend on port 8000
- Frontend on port 5173
- Web Deploy on port 3000
- Webgen on port 4000