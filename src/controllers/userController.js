// controllers/userController.js
const connectDB = require('../db/connectDB');

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

module.exports = { updateUser, deleteUser };
