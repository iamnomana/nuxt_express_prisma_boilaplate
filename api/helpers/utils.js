const jwt = require("jsonwebtoken");

const issueJWT = (user) => {
  const id = user.id;

  const expiresIn = "8h";

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, "expressnuxtsecret", {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn: expiresIn,
  };
};

module.exports.issueJWT = issueJWT;
