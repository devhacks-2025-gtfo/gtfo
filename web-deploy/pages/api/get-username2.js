// pages/api/login.js
import db from '../../database1';

export default async function handler(req, res) {
    if (req.body.username !== 'admin') {
        return res.status(401).json({ message: 'You look pretty normal to me... try admin?' });
    }
    else{
        try {
            const response = await fetch('http://localhost:8000/api/flag', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": 0 })
            });
            const data = await response.json();
            console.log(data.flag.flag)
            res.status(200).json({ message: data.flag.flag});
            }
        catch (error) {
            console.log("error")
            res.status(405).end();
        }
    }
}