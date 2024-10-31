const jwt = require("jsonwebtoken");

function createToken(user, maxAge = 60 * 60 * 24 * 3) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "MyJWT", {
    expiresIn: maxAge,
  });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "MyJWT");
  } catch {
    return null;
  }
}

module.exports = {
  createToken,
  verifyToken,
};
