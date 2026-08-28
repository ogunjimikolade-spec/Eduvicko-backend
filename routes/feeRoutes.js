const express = require("express")
const router = express.Router();
const { getFees, addpayment, updateFee, deleteFee} = require("../controllers/feeController") 



router.get("/", getFees);
router.post("/addpayment", addpayment);
router.put("/update/:id", updateFee );
router.delete("/:id", deleteFee);

module.exports = router;