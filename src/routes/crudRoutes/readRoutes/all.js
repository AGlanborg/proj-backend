const express = require('express');
const router = express.Router();

const read = require('../../../modules/crud/read')

router.get("/", async (req, res) => {
    try{
        const data = await read.all("*", "main")

        res.send({data: data})
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/crud/read/all",
                title: "Error",
                detail: e.message || e
            }
        });
    }
});

module.exports = router;