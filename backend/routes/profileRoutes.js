const express = require('express');
const { protect } = require('../middleware/auth');
const { getProfile, updateProfile, uploadPhoto } = require('../controllers/profileController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/profile/photo', protect, upload.single('photo'), uploadPhoto);

module.exports = router; 