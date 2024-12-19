const userModel = require('../models/userModel');
const connectDB = require('../db/connectDB');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Basic validation
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    // Call the model to insert the user into the database
    const newUser = await userModel.createUser({ first_name, last_name, email, password });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getUserById = async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

const updateUser = async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  const { first_name, last_name, email, password } = req.body;
  console.log(id, first_name, last_name, email, password)
  try {
    console.log("trying...")
    const [result] = await db.query(`UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', email = '${email}', password = '${password}' WHERE user_id = '${id}'`);
    console.log(result)
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });  
    }
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
// Other methods: getUserById, createUser, updateUser, deleteUser will be similar
module.exports = { getAllUsers, createUser, getUserById, updateUser, deleteUser };
