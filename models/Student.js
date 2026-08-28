const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  name: { type: String, required: true },
  gender: { type: String },
  class: { type: String },
  address: { type: String },
  parentName: { type: String },
  parentPhone: { type: String },
  dob: { type: String }
}, { timestamps: true });
 
studentSchema.pre('save', async function() {
  
    if (this.isNew && !this.studentId) {
      const count = await mongoose.model('Student').countDocuments();
      this.studentId = `STU${String(count + 1).padStart(3, '0')}`;
    }
  
});

module.exports = mongoose.model('Student', studentSchema);
