const express = require('express');
const { protect } = require('../middleware/auth');
const { 
  getPotentialMatches, 
  likeUser, 
  getMatches 
} = require('../controllers/matchController');

const router = express.Router();

router.get('/potential', protect, getPotentialMatches);
router.post('/like', protect, likeUser);
router.get('/matches', protect, getMatches);

module.exports = router; 