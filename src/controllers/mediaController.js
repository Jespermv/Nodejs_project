const mediaModel = require('../models/mediaModel');
const connectDB = require('../db/connectDB');

const getAllMedia = async (req, res) => {
  try {
    const media = await mediaModel.getAllMedia();
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
};

const getMediaById = async (req, res) => {
  const { id } = req.params;
  const db = await connectDB();
  try {
    const [rows] = await db.query('SELECT * FROM media WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Media item not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve media item' });
  } 
};

const updateMedia = async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  const { title, description, genre } = req.body;  // Assuming these fields
  console.log(id, title, description, genre)
  try {
    console.log("Trying to update...")
    const [result] = await db.query(`UPDATE media SET title = '${title}', description = '${description}', genre = '${genre}' WHERE id = '${id}'`);
    console.log(result)
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Media item not found' });
    }
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update media item' });
  }
};

const deleteMedia = async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  console.log(id)
  try {
    const [result] = await db.query('DELETE FROM media WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Media item not found' });
    }
    res.json({ message: 'Media item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete media item' });
  }
};
// Other methods: getMediaById, updateMedia, deleteMedia will be similar
module.exports = { getAllMedia, getMediaById, updateMedia, deleteMedia };
