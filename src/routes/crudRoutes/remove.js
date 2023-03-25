const express = require('express');
const router = express.Router();

const tabel = require('./deleteRoutes/tabel')

router.use("/", tabel);

module.exports = router;