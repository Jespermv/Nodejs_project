const express = require('express');
const mediaController = require('../controllers/mediaController');

const router = express.Router();

router.get('/api/media', mediaController.getAllMedia);
router.get('/api/media/:id', mediaController.getMediaById);
router.put('/api/media/:id', mediaController.updateMedia);
router.delete('/api/media/:id', mediaController.deleteMedia);
module.exports = router;
