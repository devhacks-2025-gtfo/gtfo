import express, { Request, Response, Express } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { GameGenerator } from './game/GameGenerator.js';

const app: Express = express();
const port = 4000;
const gameGenerator = GameGenerator.getInstance();

app.use(express.json());
app.use(express.static('public'));

// Mock database for challenges
const users = [
  { id: 0, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' },
  { id: 1, username: 'user1', password: 'pass123', email: 'user1@example.com', role: 'user' },
  { id: 2, username: 'user2', password: 'pass456', email: 'user2@example.com', role: 'user' },
];

const posts = [
  { id: 1, content: 'First post!', likes: 5 },
  { id: 2, content: 'Hello world!', likes: 3 },
];

// API Routes
app.post('/api/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  // Intentionally vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  console.log('SQL Query:', query);
  
  // Simulate SQL injection vulnerability
  if (username.includes("'")) {
    const flag = await gameGenerator.fetchFlag('auth-bypass-1');
    res.json({ success: true, message: 'SQL injection successful!', flag });
  } else {
    const user = users.find(u => u.username === username && u.password === password);
    res.json({ success: false, message: user ? 'Login successful!' : 'Invalid credentials' });
  }
});

app.post('/api/search', async (req: Request, res: Response): Promise<void> => {
  const { query } = req.body;
  // Intentionally vulnerable to XSS
  const results = `<div>Search results for: ${query}</div>`;
  if (query.toLowerCase().includes('<script>')) {
    const flag = await gameGenerator.fetchFlag('xss-search-1');
    res.json({ 
      results,
      success: true,
      message: 'XSS successful!',
      flag
    });
  } else {
    res.json({ results, success: false });
  }
});

app.get('/api/profile/:id', async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (id === 0) {
    const flag = await gameGenerator.fetchFlag('idor-profile-1');
    res.json({
      ...user,
      success: true,
      message: 'IDOR successful!',
      flag
    });
  } else if (user) {
    res.json({ ...user, success: false });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.post('/api/posts/:id/like', async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  
  if (post) {
    post.likes++;
    // Check if the request came from our site (CSRF check)
    const referer = req.headers.referer;
    if (!referer || !referer.includes('localhost:4000')) {
      const flag = await gameGenerator.fetchFlag('csrf-like-1');
      res.json({
        success: true,
        message: 'CSRF successful!',
        flag
      });
    } else {
      res.json({ success: false });
    }
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.get('/api/generate', (req: Request, res: Response): void => {
  const htmlFile = req.body["htmlfile"];
  if (!htmlFile) {
    res.status(400).send('No HTML file provided');
    return;
  }
  
  try {
    writeFileSync("./index.html", htmlFile, { encoding: 'utf-8', flag: 'w' });
    res.send('Generated go to (some link)');
  } catch (error) {
    res.status(500).send('Error writing file');
  }
});

// Generate a new game with random template and challenges
app.get('/api/new-game', async (_req: Request, res: Response): Promise<void> => {
  try {
    const game = await gameGenerator.generateGame();
    res.json(game);
  } catch (error) {
    console.error('Error generating game:', error);
    res.status(500).json({ error: 'Error generating game' });
  }
});

// Get current game state
app.get('/api/current-game', (_req: Request, res: Response): void => {
  const game = gameGenerator.getCurrentGame();
  if (!game) {
    res.status(404).json({ error: 'No active game found' });
    return;
  }
  res.json(game);
});

// Serve index.html for all other routes to support React routing
app.get('*', (_req: Request, res: Response): void => {
  try {
    const content = readFileSync('index.html', 'utf8');
    res.send(content);
  } catch (error) {
    res.status(404).send('Index file not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 