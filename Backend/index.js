const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const socketIo = require("socket.io");

const config = require("./config");
const hostname = "localhost";
const port = 5000;

mongoose
  .connect(config.db)
  .then(() => console.log("Conection successful!"))
  .catch((err) => console.error(err));

let router = require("./router");

var app = express();

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://*:*", //allow all IPs and All ports
  },
});

io.on("connection", (socket) => {
  console.log("Socket, new connection", socket.id);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    socket.disconnect();
  });
});
app.use("/uploads", express.static("uploads"));
app.use(router.init(io));
app.use("/images", express.static(path.join(__dirname, "images")));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
