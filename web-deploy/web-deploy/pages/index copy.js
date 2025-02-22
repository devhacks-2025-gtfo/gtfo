import { useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const response = await fetch('/api/login2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  const handleChangeEmail = async () => {
    const response = await fetch('/api/change-email2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newEmail }),
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>CSRF Vulnerable App</h1>

      <h2>Login</h2>
      <p>Enter your username to log in:</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <h2>Change Email</h2>
      <p>Enter a new email address:</p>
      <input
        type="email"
        placeholder="New Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button onClick={handleChangeEmail}>Change Email</button>

      {message && <p>{message}</p>}
    </div>
  );
}