const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

// Users
router.get("/users", userController.getUsers);
router.post("/user", userController.newUser);
router.put("/user/:id", userController.updateUser);
router.put("/user/reset-password/:id", userController.resetPassword);
router.delete("/user/:id", userController.resetPassword);

module.exports = router;
