const fs = require("fs");

module.exports.logReqRes = (filename) => {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n ${Date.now()} : ${req.url} : ${req.ip} : ${req.method}`,
      (error) => {
        if (error) {
          console.log("Error", error);
        }
        next(); // Move next() to execute after appending the log
      }
    );
  };
};
