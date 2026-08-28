const Student = require('../models/Student')

const registerStudent = async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getStudents = async (req, res) => {
    try{
        const students = await Student.find();
        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { registerStudent, getStudents, updateStudent, deleteStudent };