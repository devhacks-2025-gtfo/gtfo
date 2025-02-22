import { useEffect, useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('normal-user');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await fetch('/api/get-username2',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": username})
      });
      const data = await response.json();
      setMsg(data.message);
    };

    fetchUsername();
  })
  return <div> {msg} </div>
}