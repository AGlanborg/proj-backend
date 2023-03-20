const express = require('express');
const router = express.Router();

const all = require('./readRoutes/all')
//const filters = require('./readRoutes/filters')

router.use("/all", all);
//router.use("/filters", filters);

module.exports = router;