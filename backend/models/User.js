const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_msg: { type: String, required: true },
  ai: { type: String },
  score: { type: Number, default: 0 },
  section: { type: String, default: 'general' },
  duration: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;


