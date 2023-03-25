const express = require('express');
const router = express.Router();

const remove = require('../../../modules/crud/remove')

router.put("/:tabel", async (req, res) => {
    try{

        await remove(req.body.data)

        return res.status(201).json({
            data: {
                title: "Success",
                msg: "Main entery Deleted"
            }
        });
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/crud/delete/",
                title: "Error",
                detail: e.message || e
            }
        });
    }
});

module.exports = router;