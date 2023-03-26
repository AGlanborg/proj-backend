const express = require('express');
const router = express.Router();

const create = require('../../../modules/crud/create')
const numbers = require('../../../modules/manipulate/assign/numbers')

router.post("/", async (req, res) => {
    try{
        if (Object.keys(req.body).length == 0) {
            throw "Empty POST request"
        }

        const content = await numbers(req.body)

        await create.main(content)

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