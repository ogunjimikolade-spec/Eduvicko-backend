const express = require("express");
const { registerStudent, getStudents, updateStudent, deleteStudent } = require("../controllers/registrationController");

const router = express.Router();

// POST - Register new student
router.post("/", registerStudent);

// GET - Get all students
router.get("/", getStudents);

// PUT - Update student
router.put("/:id", updateStudent);

// DELETE - Delete student
router.delete("/:id", deleteStudent);

module.exports = router;
