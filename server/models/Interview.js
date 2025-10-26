const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  company: { type: String, required: true },
  date: { type: Date, required: true },
  poc: { type: String },
  attended: { type: Boolean, default: false },
});

module.exports = mongoose.model('Interview', interviewSchema);
