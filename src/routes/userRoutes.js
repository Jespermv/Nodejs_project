const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUserById);
router.post('/api/users', userController.validateUserCreation, userController.handleValidationErrors, userController.createUser);
router.put('/api/users/:id', authenticate, authorize(['user', 'admin']), userController.updateUser);
router.delete('/api/users/:id', authenticate, authorize(['user', 'admin']), userController.deleteUser);
module.exports = router;
