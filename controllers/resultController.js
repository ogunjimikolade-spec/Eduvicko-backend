const Result = require('../models/Result');

// GET ALL
exports.getResults = async (req, res) => {
  const results = await Result.find().sort({ createdAt: -1 });
  res.json(results);
};

// CREATE
exports.createResult = async (req, res) => {
  const result = await Result.create(req.body);
  res.status(201).json(result);
};

// UPDATE
exports.updateResult = async (req, res) => {
  const result = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(result);
};

// DELETE
exports.deleteResult = async (req, res) => {
  await Result.findByIdAndDelete(req.params.id);
  res.json({ message: 'Result deleted' });
};
