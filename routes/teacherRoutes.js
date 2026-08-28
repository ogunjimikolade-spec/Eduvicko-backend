const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();

router.get('/', async (req,res) => {
     try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ messaage: err.message })
    }
})

router.post('/', async (req, res) =>{
    try {
        const newTeacher = new Teacher(req.body); 
        const saved = await newTeacher.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({  message: err.messaage });
    }
})

module.exports = router;