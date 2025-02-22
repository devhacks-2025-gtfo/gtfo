// for choosing which questino to display
var fs = require('fs');
const express = require('express');
const app = express();
const port = 4000;
const TOT_QUESTION = 2;
function getRandomInt(max) {
  return Math.floor(Math.random() * max); //get number between 1~max
}
app.use(express.json())

app.get('/', (req, res) => {

    var content = fs.readFileSync('index.html','utf8');
    
    res.send(content);
});

app.get('/api/generate', (req, res) => {
  console.log(req.body["htmlfile"]);
  fs.writeFileSync("./index.html", req.body["htmlfile"], {encoding: 'utf-8',flag: 'w'});
  res.send('Generated go to (some link)');
});
// will replace whatever is in web-deploy/pages/index.js with the content of the selected question
app.get('/api/select', (req, res) => {
  let question = 'index'+getRandomInt(TOT_QUESTION)+'.js';
  let content = fs.readFileSync(question,'utf8');
  fs.writeFileSync("../web-deploy/web-deploy/pages/index.js", content, {encoding: 'utf-8',flag: 'w'});
  res.status(200).send(question);
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
