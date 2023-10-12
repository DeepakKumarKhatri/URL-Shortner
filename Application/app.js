var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { logReqRes } = require("./middlewares/index");
const { connectMongoDB } = require("./connectionDB");
const {
  handleRestrictToLoggedInUserOnly,
  checkAuth,
} = require("./middlewares/auth");
const staticRoute = require("./routes/staticRouter");

var urlRouter = require("./routes/url");
var userRouter = require("./routes/user");

var app = express();

// Connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/url-shortner");

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(logger("dev"));
app.use(express.json());
// Using json as well as form data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Middleware of Log file
app.use(logReqRes("logging.txt"));

app.use("/url", handleRestrictToLoggedInUserOnly, urlRouter);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRoute);

module.exports = app;
