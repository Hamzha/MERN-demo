const express = require('express');

const router = express.Router();
const requireAdmin = require('../middleware/requireAdmin');
const requireLogin = require('../middleware/requireLogin');
const userController = require('../controllers/UserController');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/all-users', requireLogin, requireAdmin, userController.get_all_users);

router.get('/user/:userId', requireLogin, userController.get_user_by_id);

router.post('/edit/:userId', requireLogin, userController.edit_user);

module.exports = router;
