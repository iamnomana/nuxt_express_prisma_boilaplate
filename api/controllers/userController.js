const { prisma, Prisma } = require("../helpers/prisma");
const { hash } = require("bcrypt");

const getUsers = async (req, res) => {
  const { search } = req.query;

  await prisma.users
    .findMany({
      where: {
        OR: [
          {
            name: {
              contains: search !== undefined ? search : "",
            },
          },
          {
            username: {
              contains: search !== undefined ? search : "",
            },
          },
        ],
        created_by: {
          not: null,
        },
      },
      select: {
        name: true,
        username: true,
        id: true,
        role: true,
      },
      orderBy: {
        updated_at: "desc",
      },
    })
    .then((users) => {
      res.status(200).send(users);
    });
};

const getUser = async (req, res) => {};

const adminAccount = async (req, res) => {
  await prisma.users
    .findUnique({
      where: {
        username: "admin",
      },
    })
    .then(async (data) => {
      if (!data) {
        const hashedPassword = await hash("admin@123", 12);

        await prisma.users.create({
          data: {
            name: "Super Admin",
            username: "admin",
            password: hashedPassword,
            role: "Administrator",
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

const newUser = async (req, res) => {
  const { name, username, user_id, role } = req.body;

  await prisma.users
    .findUnique({
      where: {
        username: username,
      },
    })
    .then(async (user) => {
      if (!user) {
        const hashedPassword = await hash("password", 12);

        await prisma.users
          .create({
            data: {
              name: name,
              username: username,
              password: hashedPassword,
              role: role,
              created_by: user_id,
            },
          })
          .then(() =>
            res.status(200).send({ message: "User account added successfully" })
          )
          .catch((e) => {
            console.log(e.message);
          });
      } else {
        res.status(403).send({ message: "This username has been taken." });
      }
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, user_id, role } = req.body;

  await prisma.users
    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        username: username,
        created_by: user_id,
        role: role,
      },
    })
    .then(() =>
      res.status(200).send({ message: "User account updated successfully" })
    )
    .catch((e) => {
      console.log(e.message);
    });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await prisma.units
    .delete({
      where: {
        id: parseInt(id),
      },
    })
    .then(() => {
      res.status(200).send({
        message: "Unit deleted successfully",
      });
    })
    .catch((e) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        let message = "";
        let status_code = 500;

        switch (e.code) {
          case "P2003":
            status_code = 401;
            message = "This user account can't be deleted";
            break;

          default:
            message = "Unknown Error";
            break;
        }

        res.status(status_code).send({ code: 10, message: message });
      }
    });
};

const resetPassword = async (req, res) => {
  const { id } = req.params;
  const hashPass = await hash("password", 12);

  await prisma.users
    .update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: hashPass,
      },
    })
    .then(() =>
      res.status(200).send({ message: "Password reset successfully" })
    )
    .catch((e) => {
      console.log(e.message);
    });
};

module.exports = {
  getUsers,
  getUser,
  adminAccount,
  newUser,
  updateUser,
  deleteUser,
  resetPassword,
};
