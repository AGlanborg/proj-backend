const express = require('express');
const router = express.Router();

const create = require('../../../../modules/crud/create')
const build = require('../../../../modules/manipulate/build')

router.post("/", async (req, res) => {
    try{
        if (Object.keys(req.body).length == 0) {
            throw "Empty POST request"
        }

        const content = build.sorted(req.body.data)

        await create.saljare(content)

        return res.status(201).json({
            data: {
                title: "Success",
                msg: "Arbetstyp entery created"
            }
        });
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/crud/create/form/saljare",
                title: "Error",
                detail: e.message || e
            }
        });
    }
});

module.exports = router;