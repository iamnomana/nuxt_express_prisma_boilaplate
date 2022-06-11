const express = require("express");
const { Builder, Nuxt } = require("nuxt");
const passport = require("passport");
const cors = require("cors");
const nuxtConfig = require("../nuxt.config.js");
const guestRoutes = require("./routes/guest");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Need to require the entire Passport config module so index.js knows about it
require("./helpers/passport-jwt");

app.use(cors());
app.use(passport.initialize());

app.use("/api", guestRoutes);
app.use(
  "/api",
  passport.authenticate("jwt", {
    session: false,
  }),
  authRoutes
);

const startServer = async () => {
  // We get Nuxt instance
  const nuxt = new Nuxt(nuxtConfig);
  const { host, port } = nuxt.options.server;

  // Build only in dev mode with hot-reloading
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host, () => {
    console.log(`Server is listening on http://${host}:${port}`);
  });
};

startServer();
