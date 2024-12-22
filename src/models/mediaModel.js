const connectDB = require('../db/connectDB.js');

const getAllMedia = async () => {
  const db = await connectDB();
  const [rows] = await db.query('SELECT * FROM media');
  return rows;
};

// Other methods for media operations (getMediaById, updateMedia, etc.)
module.exports = { getAllMedia };
 