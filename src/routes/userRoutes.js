const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const userController = require('../controllers/userController');

const router = express.Router();

router.put('/api/users/:id', authenticate, authorize(['user', 'admin']), userController.updateUser);
router.delete('/api/users/:id', authenticate, authorize(['user', 'admin']), userController.deleteUser);
module.exports = router;
