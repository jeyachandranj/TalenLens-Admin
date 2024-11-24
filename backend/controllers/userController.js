const PDFDocument = require('pdfkit');
const User = require('../models/User');
const path = require('path');

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUniqueNames = async (req, res) => {
  try {
    const uniqueNames = await User.distinct('name');
    res.status(200).json(uniqueNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAverageScoresAndDurations = async (req, res) => {
  try {
    const results = await User.aggregate([
      {
        $group: {
          _id: '$name',
          averageScore: { $avg: '$score' },
          totalDuration: { $sum: '$duration' },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          averageScore: { $round: ['$averageScore', 2] },
          totalDuration: { $round: ['$totalDuration', 2] },
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAverageScores = async (req, res) => {
  try {
    const results = await User.aggregate([
      {
        $group: {
          _id: '$name',
          averageScore: { $avg: '$score' },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          averageScore: { $round: ['$averageScore', 2] },
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.exportUserConversationsToPDF = async (req, res) => {
  try {
    const userName = req.query.name?.trim();
    if (!userName) {
      return res.status(400).json({ message: 'Invalid or missing user name' });
    }

    const userConversations = await User.find({ name: userName });

    if (!userConversations || userConversations.length === 0) {
      return res.status(404).json({ message: 'No conversations found for the user' });
    }

    const sanitizedFileName = `${userName.replace(/ /g, '_')}_conversations.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedFileName}"`);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    doc.fontSize(20).font('Helvetica-Bold').text(`Conversations of ${userName}`, { align: 'center' });
    doc.moveDown(1);
    userConversations.forEach((conversation, index) => {
      doc.fontSize(12).font('Helvetica-Bold').text(`Conversation ${index + 1}`, { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(12).font('Helvetica-Bold').text(`User Message: `, { continued: true })
         .font('Helvetica').text(`${conversation.user_msg || 'No user message'}`);
      doc.fontSize(12).font('Helvetica-Bold').text(`AI Response: `, { continued: true })
         .font('Helvetica').text(`${conversation.ai || 'No AI response'}`);

      doc.moveDown(1);
    });

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};