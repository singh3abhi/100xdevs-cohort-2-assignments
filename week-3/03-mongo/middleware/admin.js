const { Admin } = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  const username = req.headers.username;
  const password = req.headers.password;

  const userAdmin = await Admin.findOne({
    username,
  });

  if (!userAdmin) {
    return res.status(404).json({
      message: "Admin user not found with this username",
    });
  }

  if (userAdmin.password != password) {
    return res.status(401).json({
      message: "Password entered is incorrect",
    });
  }

  next();
}

module.exports = adminMiddleware;
