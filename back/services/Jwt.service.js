const jwt = require("jsonwebtoken");

exports.JwtService = {
  generateAccessToken(obj) {
    return jwt.sign(obj, "dwQWd79f87n239mm89", { expiresIn: "24h" });
  },
};
