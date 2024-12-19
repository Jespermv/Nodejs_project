const connectDB = require('../db/connectDB');

// Define like-related functions, e.g., GET likes for media or users
const getLikesForMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM likes WHERE media_id = ?', [
      mediaId,
    ]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({error: 'Failed to fetch likes for media'});
  }
};

const getLikesForUser = async (req, res) => {
  const db = await connectDB();
  const {id} = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM likes WHERE user_id = ?', [
      id,
    ]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({error: 'Failed to retrieve likes for user'});
  }
};

const addLike = async (req, res) => {
  const db = await connectDB();
  const {userId, mediaId} = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO likes (user_id, media_id) VALUES ('${userId}', '${mediaId}')`,
    );
    console.log(result);
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({error: 'Failed to add like'});
  }
};

const deleteLike = async (req, res) => {
  const db = await connectDB();
  const {id} = req.params;
  try {
    const [result] = await db.query('DELETE FROM likes WHERE like_id = ?', [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({error: 'Like not found'});
    }
    res.json({message: 'Like removed successfully'});
  } catch (err) {
    res.status(500).json({error: 'Failed to remove like'});
  }
};

// Other methods like POST, DELETE for likes, etc.
module.exports = {getLikesForMedia, getLikesForUser, addLike, deleteLike};
