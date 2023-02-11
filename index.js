const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const eventListener = require('./events/eventListener');

const app = express();
app.use(express.json());
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

//Socket instance for sending ack back to mobile app via socket
let socketInstance = null;

app.post("/webhook", (req, res) => {
    try {
        console.log('done',req.body);
    } catch (error) {
        console.log('err',err);
    }
  });

io.on("connection", (socket) => {
  console.log("Connection established",socket.id);
  socketInstance = socket;

  app.set("socketio", socket); //here you export my socket.io to a global
  eventListener(io,socket);
});

httpServer.listen(3000);