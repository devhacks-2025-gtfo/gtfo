// pages/api/login.js
import db from '../../database1';

export default function handler(req, res) {

    if (req.body.username !== 'admin') {
        return res.status(401).json({ message: 'You look pretty normal to me... try admin?' });
    }
    return res.status(200).json({ message: 'flag'});
}