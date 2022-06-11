const { PrismaClient } = require("prisma/prisma-client");
const prisma = new PrismaClient();
const { hash, compare } = require("bcrypt");
const utils = require("../helpers/utils");

const login = async (req, res, next) => {
  const { username, password } = req.body;
  await prisma.users
    .findUnique({
      where: {
        username: username,
      },
    })
    .then(async (user) => {
      if (!user) {
        return res.status(403).json({
          code: 10,
          message: "No user with such username!",
        });
      }

      const passwordIsValid = await compare(password, user.password);

      if (!passwordIsValid) {
        return res.status(403).send({
          code: 10,
          message: "Invalid Password!",
          accessToken: null,
        });
      }

      const tokenObj = utils.issueJWT(user);

      res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
          fullName: user.name,
        },
        accessToken: tokenObj.token,
        message: "Logged in successfully",
      });
    })
    .catch((e) => next(e));
};

const registerAdmin = async (req, res) => {
  await prisma.users
    .findUnique({
      where: {
        username: "admin",
      },
    })
    .then(async (data) => {
      if (!data) {
        const hashedPassword = await hash("imt@123", 12);

        await prisma.users.create({
          data: {
            name: "Super Admin",
            username: "admin",
            password: hashedPassword,
          },
        });
      }

      res.status(200).json({
        title: "done",
      });
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

module.exports = {
  login,
  registerAdmin,
};
