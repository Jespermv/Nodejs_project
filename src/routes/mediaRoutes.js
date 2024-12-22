const express = require('express');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const mediaController = require('../controllers/mediaController');

const router = express.Router();

router.put('/api/media/:id', authenticate, authorize(['user', 'admin']), mediaController.updateMedia);
router.delete('/api/media/:id', authenticate, authorize(['user', 'admin']), mediaController.deleteMedia);
module.exports = router;
