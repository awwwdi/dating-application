const User = require('../models/User');
const Match = require('../models/Match');

exports.getPotentialMatches = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { maxDistance = 50, ageRange = { min: 18, max: 100 } } = user.preferences || {};

    // Get existing matches/rejections
    const existingMatches = await Match.find({
      $or: [{ user1: user._id }, { user2: user._id }]
    }).select('user1 user2');

    const matchedUserIds = existingMatches.map(match => 
      match.user1.equals(user._id) ? match.user2 : match.user1
    );

    // Find potential matches
    const potentialMatches = await User.find({
      _id: { $nin: [...matchedUserIds, user._id] },
      'profile.gender': { $in: user.preferences?.genderPreference || [] },
      'profile.location': {
        $near: {
          $geometry: user.profile.location,
          $maxDistance: maxDistance * 1000 // Convert km to meters
        }
      }
    }).select('-password');

    res.json(potentialMatches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.likeUser = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    
    // Check if there's an existing match
    const existingMatch = await Match.findOne({
      $or: [
        { user1: req.user.id, user2: targetUserId },
        { user1: targetUserId, user2: req.user.id }
      ]
    });

    if (existingMatch) {
      return res.status(400).json({ message: 'Match already exists' });
    }

    // Create new match
    const match = await Match.create({
      user1: req.user.id,
      user2: targetUserId,
      status: 'pending'
    });

    // Check if target user has already liked current user
    const mutualMatch = await Match.findOne({
      user1: targetUserId,
      user2: req.user.id,
      status: 'pending'
    });

    if (mutualMatch) {
      match.status = 'matched';
      mutualMatch.status = 'matched';
      await Promise.all([match.save(), mutualMatch.save()]);
      
      // Emit socket event for match
      req.io.to(targetUserId.toString()).emit('newMatch', {
        matchId: match._id,
        userId: req.user.id
      });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      $or: [{ user1: req.user.id }, { user2: req.user.id }],
      status: 'matched'
    }).populate('user1 user2', '-password');

    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 