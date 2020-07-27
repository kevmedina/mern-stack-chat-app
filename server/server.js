require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// make sure express- session is used before the passport
// require("./configs/session.config")(app);
require("./configs/passport/passport.config.js")(app);
require("./configs/db.config");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  session({
    secret: "Lets go champ",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));
// app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server is running on port: ${PORT}`));

app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth.routes"));

module.exports = app;
