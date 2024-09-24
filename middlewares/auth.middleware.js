const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    res.status(403).json({
      message: "Unauthorized",
    });

    return;
  }

  const response = jwt.verify(token, process.env.JWT_SECRET);

  if (response) {
    req.userId = response.userId;
    next();
  } else {
    res.json({
      message: "Unauthorized",
    });
  }
}

async function sellerAuthMiddleware(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    res.status(403).json({
      message: "Unauthorized",
    });

    return;
  }

  const response = jwt.verify(token, process.env.JWT_SELLER_SECRET);

  if (response) {
    req.userId = response.userId;
    next();
  } else {
    res.json({
      message: "Unauthorized",
    });
  }
}

module.exports = { authMiddleware, sellerAuthMiddleware };
