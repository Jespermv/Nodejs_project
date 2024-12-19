const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

router.get('/api/likes/media/:id', likeController.getLikesForMedia);
router.get('/api/likes/user/:id', likeController.getLikesForUser);
router.post('/api/likes', likeController.addLike);
router.delete('/api/likes/:id', likeController.deleteLike);
module.exports = router;
