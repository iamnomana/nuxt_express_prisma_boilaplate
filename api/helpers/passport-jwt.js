const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { prisma } = require("./prisma");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "expressnuxtsecret",
};

const verifyCallback = async (payload, done) => {
  await prisma.users
    .findUnique({
      where: {
        id: payload.sub,
      },
    })
    .then(async (user) => {
      if (user) {
        let data = {
          id: user.id,
          username: user.username,
          name: user.name,
        };

        return done(null, data, {
          message: "Data",
        });
      } else {
        return done(null, false, {
          message: "No data",
        });
      }
    })
    .catch((e) =>
      done(e, null, {
        message: "Failed",
      })
    );
};

const strategy = new JWTStrategy(options, verifyCallback);
passport.use(strategy);
