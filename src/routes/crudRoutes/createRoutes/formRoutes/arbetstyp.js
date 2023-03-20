const express = require('express');
const router = express.Router();

const create = require('../../../../modules/crud/create')

router.post("/", async (req, res) => {
    try{
        if (Object.keys(req.body).length == 0) {
            throw "Empty POST request"
        }

        create.arbetstyp(req.body)

        return res.send("worked")
    } catch (e) {
        return res.status(500).json({
            errors: {
                status: 500,
                source: "/crud/create/form/arbetstyp",
                title: "Error",
                detail: e.message || e
            }
        });
    }
});

module.exports = router;