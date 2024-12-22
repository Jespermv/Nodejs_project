// controllers/userController.js
const connectDB = require('../db/connectDB');
const userModel = require('../models/userModel');
const { body, validationResult } = require('express-validator');

// User registration validation
const validateUserCreation = [
  body('first_name')
    .notEmpty().withMessage('First name is required')
    .isAlpha().withMessage('First name must be alphabetic'),
  body('last_name')
    .notEmpty().withMessage('Last name is required')
    .isAlpha().withMessage('Last name must be alphabetic'),
  body('email')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .trim(),
];

// User update validation
const validateUserUpdate = [
  body('first_name')
    .optional()
    .isAlpha().withMessage('First name must be alphabetic'),
  body('last_name')
    .optional()
    .isAlpha().withMessage('Last name must be alphabetic'),
  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .trim(),
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User creation logic
const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const newUser = await userModel.createUser({ first_name, last_name, email, password });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Query the database to retrieve all users
    const [users] = await connectDB().query('SELECT * FROM users');
    
    // If no users are found, send a 404 error
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Send the list of users as the response
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    // Handle errors (e.g., database issues)
    console.error('Error fetching users:', err.message);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Query the database to get the user by their ID
    const [user] = await connectDB().query('SELECT * FROM users WHERE user_id = ?', [id]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, password } = req.body;
  const { user_id, role } = req.user;

  // Only admins or the owner can update user info
  if (role !== 'admin' && parseInt(user_id, 10) !== parseInt(id, 10)) {
    return res.status(403).json({ error: 'Not authorized to update this user' });
  }

  try {
    const db = await connectDB();
    const [result] = await db.query(
      'UPDATE users SET first_name = ?, last_name = ?, password = ? WHERE user_id = ?',
      [first_name, last_name, password, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { user_id, role } = req.user;

  // Only admins can delete any user, or the owner can delete their own account
  if (role !== 'admin' && parseInt(user_id, 10) !== parseInt(id, 10)) {
    return res.status(403).json({ error: 'Not authorized to delete this user' });
  }

  try {
    const db = await connectDB();
    const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = { validateUserCreation, handleValidationErrors, createUser, validateUserUpdate, updateUser, deleteUser, getAllUsers, getUserById };
