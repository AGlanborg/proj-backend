const express = require('express');
const router = express.Router();

const create = require('../../../modules/crud/create')
const numbers = require('../../../modules/manipulate/assign/numbers')

router.post("/", async (req, res) => {
    try{
        if (Object.keys(req.body).length == 0) {
            throw "Empty POST request"
        }
        console.log("#1")
        const content = await numbers(req.body)
        console.log("#2")
        await create.main(content)
        console.log("#3")
        return res.status(201).json({
            data: {
                title: "Success",
                msg: "Main entery created"
            }
        });
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/crud/create/csv",
                title: "Error",
                detail: e.message || e
            }
        });
    }
});

module.exports = router;