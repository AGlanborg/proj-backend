const express = require('express');
const router = express.Router();

const csv = require('./createRoutes/csv')
const form = require('./createRoutes/form')

router.use("/csv", csv);
router.use("/form", form);

module.exports = router;