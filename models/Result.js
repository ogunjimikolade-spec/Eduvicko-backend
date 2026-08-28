const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: { type: String, required: true }, // links to student.studentId
  name: { type: String }, // optional, for easy display
  class: { type: String, require: true },
  subject: { type: String, required: true },
  term: { type: String, required: true }, // "First Term", "Second Term"
  session: { type: String, required: true }, // "2025/2026"
  score: { type: Number, required: true },
  grade: { type: String } // A, B, C - we can auto-calculate later
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
