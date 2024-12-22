// controllers/mediaController.js
const mediaModel = require('../models/mediaModel');
const connectDB = require('../db/connectDB');

const updateMedia = async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  const { title, description, genre } = req.body;
  const { user_id, role } = req.user; // Get the user_id from the JWT

  try {
    // Check if user is owner or admin
    const [media] = await db.query('SELECT * FROM media WHERE id = ?', [id]);
    if (media.length === 0) return res.status(404).json({ error: 'Media item not found' });

    if (role !== 'admin' && media[0].user_id !== user_id) {
      return res.status(403).json({ error: 'Not authorized to update this media' });
    }

    // Proceed to update media
    const [result] = await db.query(
      'UPDATE media SET title = ?, description = ?, genre = ? WHERE id = ?',
      [title, description, genre, id]
    );
    res.json({ message: 'Media item updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update media item' });
  }
};

const deleteMedia = async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  const { user_id, role } = req.user;

  try {
    const [media] = await db.query('SELECT * FROM media WHERE id = ?', [id]);
    if (media.length === 0) return res.status(404).json({ error: 'Media item not found' });

    // Check if user is owner or admin
    if (role !== 'admin' && media[0].user_id !== user_id) {
      return res.status(403).json({ error: 'Not authorized to delete this media' });
    }

    const [result] = await db.query('DELETE FROM media WHERE id = ?', [id]);
    res.json({ message: 'Media item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete media item' });
  }
};

module.exports = { updateMedia, deleteMedia };
