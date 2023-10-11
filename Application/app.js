var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { logReqRes } = require("./middlewares/index");
const { connectMongoDB } = require("./connectionDB");
const staticRoute = require("./routes/staticRouter");

var urlRouter = require("./routes/url");

var app = express();

// Connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/url-shortner");

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

app.use(logger("dev"));
app.use(express.json());
// Using json as well as form data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Middleware of Log file
app.use(logReqRes("logging.txt"));

app.use("/url", urlRouter);
app.use("/", staticRoute);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
