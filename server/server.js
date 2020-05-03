const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const users = [];
const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (sock) => {
  // A Player Joins the Lobby
  sock.on("username", (username) => {
    // Writes joined lobby
    io.emit("username", username);
    sock.username = username;
    users.push(sock.username);
  });
  // Send Message
  sock.on("message", (text) => {
    // sock.emit sends to client, io.emit sends it to everyone
    // who is connected
    io.emit("message", { msg: text, user: sock.username });
  });
});

server.on("error", (err) => {
  console.error("Server error: ", err);
});

server.listen(8080, () => {
  console.log("RPS started on 8080");
});
