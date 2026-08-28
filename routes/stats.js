const  Student = require("../models/Student");
const Teacher = require('../models/Teacher')
const Class = require('../models/Class')
const express = require("express");

const router = express.Router();


router.get("/dashboard", async (req, res) => {
    try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalClasses = await Class.countDocuments();
    res.json({ students: totalStudents, teachers: totalTeachers,  classes: totalClasses});


} catch (err) {
    res.status(500).json({ message: err.message });
}
});
 module.exports = router;