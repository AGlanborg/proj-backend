const express = require('express');
const router = express.Router();

const arbetstyp = require('./formRoutes/arbetstyp')
const kopare = require('./formRoutes/kopare')
const main = require('./formRoutes/main')
const saljare = require('./formRoutes/saljare')

router.use("/arbetstyp", arbetstyp);
router.use("/kopare", kopare);
router.use("/main", main);
router.use("/saljare", saljare);

module.exports = router;