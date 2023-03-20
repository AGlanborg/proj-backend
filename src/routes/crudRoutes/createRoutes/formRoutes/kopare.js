const express = require('express');
const router = express.Router();

const create = require('../../../../modules/crud/create')

router.post("/", async (req, res) => {
    try{
        if (Object.keys(req.body).length == 0) {
            throw "Empty POST request"
        }

        create.kopare(req.body)

        return res.send("worked")
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/crud/create/form/kopare",
                title: "Error",
                detail: e.message || e
            }
        });
    }
});

module.exports = router;