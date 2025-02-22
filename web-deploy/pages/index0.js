import { useEffect, useState } from 'react';


// how to solve: 
// if you take a look at inspect > network, you can see api request is being made at
// http://localhost:3000/api/get-username2
// with payload {"username":"normal-user"}
// so, we can change the username to admin
// and we can get the flag
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