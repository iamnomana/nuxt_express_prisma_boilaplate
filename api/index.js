const express = require("express");
const cors = require("cors");
const { Builder, Nuxt } = require("nuxt");
const nuxtConfig = require("../nuxt.config.js");

const app = express();

app.use(express.json());
app.use(express.static(join(__dirname, "../", "dist")));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

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
