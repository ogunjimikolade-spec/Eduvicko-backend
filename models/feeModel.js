const mongoose = require("mongoose");
const feeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  term: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  amountPaid: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    
  },
  status: {
    type: String,
    enum: ['Paid', 'Part Payment', 'Owing'],
    default: 'Owing'
  },
  date: {
    type: Date,
    default: Date.now
  }
});
feeSchema.pre('save', function(next){
  this.balance = this.amount - this.amountPaid;
  if(this.balance <= 0) this.status = "Paid";
  else if(this.amountPaid > 0) this.status = "Part Payment";
  else this.status = "Owing";
  
})
module.exports = mongoose.model("Fee", feeSchema);

