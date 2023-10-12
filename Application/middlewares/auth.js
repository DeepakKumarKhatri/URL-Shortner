const { getUser } = require("../service/auth");

module.exports.handleRestrictToLoggedInUserOnly = async (req, res, next) => {
  const userUid = req.cookies?.uid;
  console.log("User UID:", userUid);

  // If user is not logged in or cookie is missing
  if (!userUid) {
    return res.redirect("/login");
  }

  // Check if the session ID is valid
  const user = await getUser(userUid);
  console.log("User:", user);

  if (!user) {
    // Invalid session ID or user not found
    return res.redirect("/login");
  }

  req.user = user;
  next();
};

module.exports.checkAuth = (req, res, next) => {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);

  req.user = user;
  next();
};
