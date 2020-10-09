const router = require('express').Router();

const Status = require('../models/status');

router.get('/', async (req,res) => {
    statuses = await Status.find();
    if (!statuses) {
        return res.status(404).send("Error occured while fetching statuses.");
    }

    res.send(statuses);
});

module.exports = router;