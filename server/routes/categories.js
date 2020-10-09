const router = require('express').Router();

const Category = require('../models/category');

router.get('/', async (req,res) => {
    let categories = await Category.find();
    if (!categories) {
        return res.status(404).send("Error occured while fetching products.");
    }

    res.send(categories);
});

module.exports = router;