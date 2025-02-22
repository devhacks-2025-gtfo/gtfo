import React, { FC, useState } from 'react';
import type { Challenge } from '../types/templates';

const LoginComponent: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.message.includes('Flag:')) {
        setSuccess(true);
        console.log('🎉 Flag found:', data.message);
        // Show success message for 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      // Silently fail
    }
  };

  return (
    <div className="auth-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Sign in</button>
      {success && (
        <div className="success-popup">
          🎉 Challenge completed! Check the Network tab for the flag.
        </div>
      )}
    </div>
  );
};

const AuthenticationChallenge: Challenge = {
  id: 'auth-bypass-1',
  type: 'authentication',
  name: 'Basic Auth Bypass',
  description: 'Try to bypass the authentication by exploiting SQL injection vulnerabilities',
  difficulty: 'easy',
  points: 100,
  component: LoginComponent,
  solution: "Use SQL injection with username: admin' -- and any password",
  flag: "flag{sql_injection_auth_bypass_2025}"
};

export default AuthenticationChallenge; 