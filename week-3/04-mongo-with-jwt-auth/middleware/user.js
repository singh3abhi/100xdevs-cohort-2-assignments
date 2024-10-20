// Middleware for handling auth
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  const token = req.headers.authorization;

  const words = token.split(" ");
  const jwtToken = words[1];
  const secretKey = process.env.JWT_SECRET;

  const decodedValue = jwt.verify(jwtToken, secretKey);

  if (decodedValue.usernmae) {
    req.username = username;
    next();
  } else {
    res.status(403).json({
      message: "Please login again",
    });
  }
}

module.exports = userMiddleware;
