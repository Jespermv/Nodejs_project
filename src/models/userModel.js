const connectDB = require('../db/connectDB');

const getAllUsers = async () => {
  const db = await connectDB();
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

const createUser = async ({ first_name, last_name, email, password }) => {
  const db = await connectDB();
  const [result] = await db.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', 
    [first_name, last_name, email, password]
  );
  
  // Return the inserted user (you can customize this based on your database schema)
  return { id: result.insertId, first_name, last_name, email };
};

// Other methods for user operations (getUserById, createUser, etc.)
module.exports = { getAllUsers, createUser };
