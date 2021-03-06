require("dotenv").config();

const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketio(server);

// make sure express- session is used before the passport
require("./configs/session.config")(app);
require("./configs/passport/passport.config.js")(app);
require("./configs/db.config");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth.routes"));

const PORT = process.env.PORT;
server.listen(PORT, console.log(`Server is running on port: ${PORT}`));

module.exports = app;
