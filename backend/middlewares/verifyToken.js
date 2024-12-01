const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
  const token = request.header("authorization");

  if (!token) {
    return response
      .status(403)
      .send({ statusCode: 403, message: "Token not valid or not passed" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    request.user = verified;
    next();
  } catch (e) {
    response
      .status(403)
      .send({ statusCode: 403, message: "Token expired or not valid" });
  }
};
