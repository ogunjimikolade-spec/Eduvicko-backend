const Student = require('../models/Student');
const Fee = require('../models/feeModel')



const getFees = async (req, res) => {
  try {
    const fees = await Fee.find().sort({ createdAt: -1 });
    res.status(200).json(fees)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addpayment = async (req, res) => {
  try {
    console.log("Data received:", req.body);
    
    const { studentId, name, class: className, term, type, amount, amountPaid } = req.body;

    const amountNum = Number(amount);
    const paidNum = Number(amountPaid) || 0;
    const balanceNum = amountNum - paidNum; // WE CALCULATE IT

    let status = 'Owing';
    if(balanceNum === 0) status = 'Paid';
    else if(paidNum > 0) status = 'Part Payment';

    const newFee = await Fee.create({
      studentId,
      name,
      class: className,
      term,
      type,
      amount: amountNum,
      amountPaid: paidNum,
      balance: balanceNum, // SEND IT DIRECTLY
      status: status // ADD THIS TOO
    });
    
    res.status(201).json({ message: "Payment recorded successfully", data: newFee });
  } catch (error) {
    console.log("BACKEND ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
    
  const updateFee = async (req, res) => {
  try {
    const { amountPaid } = req.body;
    const fee = await Fee.findById(req.params.id);

    if (!fee) return res.status(404).json({ message: "Fee not found" });

    // Update only amountPaid
    fee.amountPaid = amountPaid;
    
    // Recalculate balance and status
    fee.balance = fee.amount - amountPaid;
    fee.status = fee.balance === 0 ? 'Paid' : 'Part Payment';

    await fee.save();
    res.status(200).json(fee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteFee = async (req, res) => {
  try {
    await Fee.findByIdAndDelete(req.params.id);
     res.status(200).json({ message: "Payment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
 
};

module.exports = { getFees, addpayment, updateFee, deleteFee };
