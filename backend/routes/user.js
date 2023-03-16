const express = require("express");
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const requireAdmin = require('../middleware/requireAdmin');
const user_controller = require('../controllers/UserController')

router.post("/register", user_controller.register);

router.post("/login", user_controller.login);

router.get("/all-users", requireLogin, requireAdmin, user_controller.get_all_users);

router.get("/user/:userId", requireLogin, user_controller.get_user_by_id);

router.post("/edit/:userId", requireLogin, user_controller.edit_user);

module.exports = router;
