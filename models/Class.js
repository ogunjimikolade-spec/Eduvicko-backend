const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: { type: String, required: true, unique: true }, // JSS1A, SS2B
  classTeacher: { type: String }, // Optional
  arm: { type: String }, // A, B, C
  studentCount: { type: Number, default: 0 }, // Optional
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
