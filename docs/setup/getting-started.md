# Getting Started

## Prerequisites

- Node.js (v20.18.0 or higher)
- npm (latest version)
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/devhacks-2025-gtfo/gtfo.git
cd gtfo
```

2. Install dependencies for each component:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
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

# Terminal 3 - Webgen
cd webgen
npm run dev
```

The application will be running at:
- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- Webgen: http://localhost:4000

## Development Setup

1. **Environment Variables**
   Create `.env` files in each component directory:

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

2. **IDE Configuration**
   - Install recommended VS Code extensions
   - Use provided workspace settings
   - Enable TypeScript strict mode

3. **Development Tools**
   - ESLint for code linting
   - Prettier for code formatting
   - Jest for testing
   - React DevTools for frontend debugging

## Testing

Run tests for each component:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Webgen tests
cd webgen
npm test
```

## Building for Production

Build all components:

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build

# Webgen
cd webgen
npm run build
```

## Deployment

1. **Backend Deployment**
   - Set production environment variables
   - Build the application
   - Start with process manager (e.g., PM2)

2. **Frontend Deployment**
   - Build static assets
   - Serve with nginx/Apache
   - Configure for SPA routing

3. **Webgen Deployment**
   - Build server and client
   - Configure reverse proxy
   - Set production environment

## Troubleshooting

1. **Common Issues**
   - Port conflicts
   - Environment variables missing
   - Dependencies version mismatch
   - WebSocket connection issues

2. **Solutions**
   - Check port availability
   - Verify environment setup
   - Clear npm cache and reinstall
   - Check network/firewall settings

## Additional Resources

- [Architecture Overview](../architecture/overview.md)
- [API Documentation](../api/endpoints.md)
- [Component Details](../components/)