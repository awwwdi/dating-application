const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = {
      profile: {
        ...req.user.profile,
        ...req.body,
      }
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Update user's photos array
    const user = await User.findById(req.user.id);
    user.profile.photos = user.profile.photos || [];
    user.profile.photos.push(result.secure_url);
    await user.save();

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 