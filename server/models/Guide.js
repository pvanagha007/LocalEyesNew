const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3 },
  content: { type: String, required: true, minlength: 10 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Guide', guideSchema);
