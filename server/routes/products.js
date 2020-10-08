const router = require('express').Router();
const Product = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', async (req,res) => {
    let products = await Product.find();
    res.send(products);
});

router.get('/:id', async (req,res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send('Invalid id was given.');
    }

    let product = await Product.findOne({ _id: new ObjectId(id) });

    if (!product) {
        return res.status(404).send('Product with given id not found.');
    }

    res.send(product);
});

module.exports = router;