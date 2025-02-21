// app.js
var fs = require('fs');
const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {

    var content = fs.readFileSync('index.html','utf8');
    
    res.send(content);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
