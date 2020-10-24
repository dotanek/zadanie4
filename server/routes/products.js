const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const validate = require('../validate.js');
var cors = require('cors')

const Product = require('../models/product');
const Category = require('../models/category');

router.get('/', async (req,res) => {
    let products = await Product.find();
    if (!products) {
        return res.status(404).send("Error occured while fetching products.");
    }

    res.send(products);
});

router.get('/:id', async (req,res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send('Invalid id was given.');
    }

    let product = await Product.findOne({ _id: ObjectId(id) });
    if (!product) {
        return res.status(404).send('Product with given id was not found.');
    }

    res.send(product);
});

var whitelist = ['http://localhost:3001']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.post('/', cors(corsOptions), async (req,res) => {
    let { error } = validate.validateCreateProduct(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let category = await Category.findOne({ _id: ObjectId(req.body.category_id) });
    if (!category) {
        return res.status(404).send("No category with given id was not found.");
    }

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        weight: req.body.weight,
        category_id: ObjectId(category._id)
    });

    try {
        await product.save();
    } catch (e) {
        return res.status(400).send(e);
    }

    res.send('Product succesfully added.');
});

router.put('/:id', cors(corsOptions), async (req,res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid id was given.');
    }

    let product = await Product.findOne({ _id: ObjectId(id) })
    if (!product) {
        return res.status(404).send('Product with given id not found.');
    }
    
    let { value,error } = validate.validateUpdateProduct(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Looping through all verified attributes and updaing them in product.
    Object.entries(value).forEach(v => product[v[0]] = v[1]);

    try {
        await product.save();
    } catch (e) {
        return res.status(400).send(e);
    }

    res.send('Product succesfully updated.');
});

module.exports = router;