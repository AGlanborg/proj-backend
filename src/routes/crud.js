const express = require('express');
const router = express.Router();

const create = require('./crudRoutes/create')
const read = require('./crudRoutes/read')
const update = require('./crudRoutes/update')
// const remove = require('./crudRoutes/remove')

router.use("/create", create);
router.use("/read", read);
router.use("/update", update);
// router.use("/delete", remove);

module.exports = router;