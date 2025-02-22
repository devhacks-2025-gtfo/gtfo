import React, { FC, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Challenge, ChallengeType, GameTemplate } from '../types/templates';

// Import challenge components
import AuthenticationChallenge from '../challenges/AuthenticationChallenge';
import XSSChallenge from '../challenges/XSSChallenge';
import IDORChallenge from '../challenges/IDORChallenge';
import CSRFChallenge from '../challenges/CSRFChallenge';

interface ChallengeProps {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  onFlagFound?: (flag: string) => void;
}

// Map challenge types to their actual components
const challengeComponents: Record<ChallengeType, FC<ChallengeProps>> = {
  'authentication': AuthenticationChallenge.component as FC<ChallengeProps> || (() => <div>Authentication Challenge Not Found</div>),
  'xss': XSSChallenge.component as FC<ChallengeProps> || (() => <div>XSS Challenge Not Found</div>),
  'idor': IDORChallenge.component as FC<ChallengeProps> || (() => <div>IDOR Challenge Not Found</div>),
  'csrf': CSRFChallenge.component as FC<ChallengeProps> || (() => <div>CSRF Challenge Not Found</div>),
  'injection': AuthenticationChallenge.component as FC<ChallengeProps> || (() => <div>Authentication Challenge Not Found</div>),
};

const ChallengeWrapper: FC<{ challenge: Challenge }> = ({ challenge }) => {
  if (!challenge || !challenge.type) {
    console.warn('Invalid challenge or missing type:', challenge);
    return null;
  }

  const Component = challengeComponents[challenge.type];
  if (!Component) {
    console.warn(`No component found for challenge type: ${challenge.type}`);
    return null;
  }

  console.log('Rendering challenge:', {
    id: challenge.id,
    type: challenge.type,
    name: challenge.name
  });

  const handleFlagFound = (flag: string) => {
    console.log(`Flag found for challenge ${challenge.id}:`, flag);
  };

  return (
    <Component
      id={challenge.id}
      name={challenge.name}
      description={challenge.description}
      difficulty={challenge.difficulty}
      points={challenge.points}
      onFlagFound={handleFlagFound}
    />
  );
};

const App: React.FC = () => {
  const [game, setGame] = useState<GameTemplate | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('/api/new-game')
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((gameData: GameTemplate) => {
        console.log('Game loaded:', gameData);
        setGame(gameData);
      })
      .catch((error: Error) => {
        console.error('Failed to load game:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!game) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app-container">
      <div className="social-layout">
        <header className="header">
          <nav className="nav">
            <div className="logo">SocialApp</div>
            <div className="nav-content">
              <div className="search">
                {game.challenges[0] && (
                  <ChallengeWrapper challenge={game.challenges[0]} />
                )}
              </div>
              <div className="auth">
                {game.challenges[1] && (
                  <ChallengeWrapper challenge={game.challenges[1]} />
                )}
              </div>
            </div>
          </nav>
        </header>
        <div className="content-wrapper">
          <aside className="sidebar">
            <div className="profile">
              {game.challenges[2] && (
                <ChallengeWrapper challenge={game.challenges[2]} />
              )}
            </div>
            <nav className="navigation">
              <ul>
                <li>Home</li>
                <li>Messages</li>
                <li>Notifications</li>
                <li>Settings</li>
              </ul>
            </nav>
          </aside>
          <main className="main-content">
            <div className="feed">
              {game.challenges[3] && (
                <ChallengeWrapper challenge={game.challenges[3]} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

// Initialize the app
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 