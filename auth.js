const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

var verify = (req, res, next) => {
  try {
    const tokenHeaderKey = process.env.tokenHeader;
    const jwtSecretKey = process.env.jwtSecret;
    const token = req.headers[tokenHeaderKey];
    if (!token) {
      return res
        .status(401)
        .send(process.env.production ? "Invalid request" : error);
    }
    const { uid, accesskey } = jwt.verify(token, jwtSecretKey);

    if (uid) {
      req.uid = uid;
      if (accesskey) req.accesskey = accesskey;
      next();
    } else {
      return res
        .status(401)
        .send(process.env.production ? "Invalid request" : error);
    }
  } catch (error) {
    return res
      .status(401)
      .send(process.env.production ? "Invalid request" : error);
  }
};

module.exports = { verify };
