const Message = require('../models/Message');
const Match = require('../models/Match');

exports.getMessages = async (req, res) => {
  try {
    const { matchId } = req.params;
    
    // Verify user is part of the match
    const match = await Match.findOne({
      _id: matchId,
      $or: [{ user1: req.user.id }, { user2: req.user.id }]
    });

    if (!match) {
      return res.status(403).json({ message: 'Not authorized to view these messages' });
    }

    const messages = await Message.find({ match: matchId })
      .sort('createdAt')
      .populate('sender', 'profile.firstName profile.photos');

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { content } = req.body;

    // Verify user is part of the match
    const match = await Match.findOne({
      _id: matchId,
      status: 'matched',
      $or: [{ user1: req.user.id }, { user2: req.user.id }]
    });

    if (!match) {
      return res.status(403).json({ message: 'Not authorized to send messages' });
    }

    const message = await Message.create({
      match: matchId,
      sender: req.user.id,
      content
    });

    const populatedMessage = await message.populate('sender', 'profile.firstName profile.photos');

    // Emit socket event
    const recipientId = match.user1.equals(req.user.id) ? match.user2 : match.user1;
    req.io.to(recipientId.toString()).emit('newMessage', populatedMessage);

    res.json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 