const express = require('express');
const router = express.Router();
const { getResults, createResult, updateResult, deleteResult } = require('../controllers/resultController');

router.route('/').get(getResults).post(createResult);
router.route('/:id').put(updateResult).delete(deleteResult);

module.exports = router;
