const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");

module.exports.handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("login");
};

module.exports.handleUserLoginIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid username or password",
    });
  }
  const sessionId = uuidv4();
  console.log("sessionId", sessionId);
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
};
