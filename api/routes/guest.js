const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const passport = require("passport");

// CREATE ADMIN ACCOUNT
router.post("/auth/admin", userController.adminAccount);

// LOGIN
router.post("/auth/login", authController.login);

// GET CURRENT USER DATA
router.get(
  "/auth/currentUser",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.status(200).send({
      user: req.user,
    });
  }
);

module.exports = router;
