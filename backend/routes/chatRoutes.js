const express = require('express');
const { protect } = require('../middleware/auth');
const { getMessages, sendMessage } = require('../controllers/chatController');

const router = express.Router();

router.get('/:matchId/messages', protect, getMessages);
router.post('/:matchId/messages', protect, sendMessage);

module.exports = router; 