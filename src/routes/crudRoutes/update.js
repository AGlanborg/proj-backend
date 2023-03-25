const express = require('express');
const router = express.Router();

const main = require('./updateRoutes/main')

router.use("/main", main);

module.exports = router;