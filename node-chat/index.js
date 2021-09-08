const cors = require('cors');
const express = require('express')
const app = express()
const port = 3000

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1263265",
  key: "5c0f987c8a442b437e4d",
  secret: "8f30064c2230be53e4aa",
  cluster: "mt1",
  useTLS: true
});

app.use(cors({
  origin: ["http://localhost:8080"]
}))

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/messages", async(req, res) => {
  await pusher.trigger("chat", "message", {
    username: req.body.username,
    message: req.body.message
  });
  res.json([]);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})