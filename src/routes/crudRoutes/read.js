const express = require('express');
const router = express.Router();

const tabel = require('./readRoutes/tabel')

router.use("/", tabel);

module.exports = router;