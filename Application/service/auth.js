const jwt = require("jsonwebtoken");
const secretKey = "Deepak123@456";

module.exports.setUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const myToken = jwt.sign(payload, secretKey);
  return myToken;
};

module.exports.getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
