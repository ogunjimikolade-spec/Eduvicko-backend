const Class = require('../models/Class');

exports.getClasses = async (req, res) => {
  const classes = await Class.find().sort({ createdAt: -1 });
  res.json(classes);
};

exports.createClass = async (req, res) => {
  const classData = await Class.create(req.body);
  res.status(201).json(classData);
};

exports.updateClass = async (req, res) => {
  const classData = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(classData);
};

exports.deleteClass = async (req, res) => {
  await Class.findByIdAndDelete(req.params.id);
  res.json({ message: 'Class deleted' });
};
