const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Student = require('../models/Student'); // UNCOMMENT THIS

// GET ALL STUDENTS
router.get('/', async (req, res) =>{
  try {
    const students = await Student.find();
    res.json(students); // RETURN STUDENTS NOT MESSAGE
  } catch (error) {
    console.log(error)
    res.status(500).json([]);
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    if(!query) return res.json([]);
     const students = await Student.find({
      $or: [
        {name: { $regex: query, $options: 'i'} },
        { studentId: { $regex: query, $options: 'i'} }
      ]
     })
     res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
} )
// REGISTER STUDENT
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { studentId, password } = req.body;
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(400).json({ message: "Invalid Student ID or Password" });
    
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Student ID or Password" });

    res.status(200).json({ message: "Login successful", student });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.put('/:id', async (req, res) => {
  try { 
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
