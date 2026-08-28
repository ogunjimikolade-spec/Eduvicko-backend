const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const Student = require('../models/Student')

const loginStudent = asyncHandler(async (req, res) =>{
    const { StudentId, password } = req.body
    const student = await Student.findOne({
        $or: [{studentId}, {email: studentId}]
    })
})
if(student && (await bcrypt.compare(password, student.password))){
    res.json({
        _id: student._id,
        name: student.name,
        studentId: studnt.StudentId,
        class: student.class,
        balance: student.balance,
        token: generateToken(student._id)
    })
}else {
    res.status(400)
    throw new Error('Invalid studentId or password')
}

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'} )
 module.exports = { loginStudent}