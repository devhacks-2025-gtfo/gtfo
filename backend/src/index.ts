import express from "express";

const app: express.Application = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});