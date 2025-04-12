const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  place: String,
  stay: String,
  guide: String,
  rating: Number,
  review: String,
  media: [String],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);