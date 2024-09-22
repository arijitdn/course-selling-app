const jwt = require("jsonwebtoken");
const { CONSTANTS } = require("../constants");

async function auth(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    res.status(403).json({
      message: "Unauthorized",
    });

    return;
  }

  const response = jwt.verify(token, CONSTANTS.JWT_SECRET);

  if (response) {
    req.userId = response.userId;
    next();
  } else {
    res.json({
      message: "Unauthorized",
    });
  }
}
