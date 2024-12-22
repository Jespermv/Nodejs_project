const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/connectDB');

const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const [users] = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`,
    );
    const user = users[0];
    if (!user) return res.status(404).json({error: 'User not found'});

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({error: 'Invalid credentials'});

    const token = jwt.sign(
      {user_id: user.user_id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '1h'},
    );

    res.json({token});
  } catch (err) {
    res.status(500).json({error: 'Authentication failed'});
  }
};

module.exports = {loginUser};
