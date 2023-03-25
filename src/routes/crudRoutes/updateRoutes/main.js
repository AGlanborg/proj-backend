const express = require('express');
const router = express.Router();

const main = require('../../../modules/crud/update/main')

router.put("/", async (req, res) => {
    try{
        await main(req.body.data)

        return res.status(201).json({
            data: {
                title: "Success",
                msg: "Main entery updated"
            }
        });
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/crud/update/main",
                title: "Error",
                detail: e.message || e
            }
        });
    }
});

module.exports = router;