const router = require('express').Router();
const ObjectId = require('mongoose').Types.ObjectId;
const validate = require('../validate');

const Order = require('../models/order');
const Product = require('../models/product');
const Status = require('../models/status');

router.get('/', async (req,res) => {
    orders = await Order.find();
    if (!orders) {
        return res.status(404).send("Error occured while fetching orders.");
    }

    res.send(orders);
});

router.put('/:id', async (req,res) => {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send('Invalid id was given.');
    }

    let { error } = validate.validateUpdateOrder(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let order = await Order.findOne({ _id: new ObjectId(id) });
    if (!order) {
        return res.status(404).send('Order with given id was not found.');
    }

    let statuses = await Status.find();
    if (!statuses) {
        return res.status(404).send("Error occured while fetching statuses.");
    }

    let oldStatus = statuses.find(s => {
        let a = ObjectId(s._id);
        let b = ObjectId(order.status_id);
        return a.equals(b);
    });

    let newStatus = statuses.find(s => {
        let a = ObjectId(s._id);
        let b = ObjectId(req.body.status_id);
        return a.equals(b);
    });

    if (oldStatus.name === 'REALIZED') {
        return res.status(400).send('Cannot change the REALIZED state.');
    }

    order.status_id = ObjectId(req.body.status_id);

    try {
        await order.save();
    } catch (e) {
        res.status(400).send(e);
    }

    res.send('Order updated succesfully.');
});

router.post('/', async (req,res) => {
    let { error } = validate.validateCreateOrder(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Eliminating duplicated ids (Because Product.find will return no duplicates aswell.)
    let uniqueProductIds = [...new Set(req.body.products.map(p => p.product_id))];

    products = await Product.find({
        _id: { $in: uniqueProductIds.map(i => new ObjectId(i)) }
    });

    if (uniqueProductIds.length !== products.length) {
        return res.status(404).send('At least one product for given ids was not found.');
    }

    let status = await Status.find({ _name:'UNCONFIRMED' });
    if (!status) {
        return res.status(404).send('Error occured during creating an order.');
    }

    let order = new Order({
        status_id: new ObjectId(status._id),
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        products: req.body.products.map(p => {
            return { 
                product_id: new ObjectId(p.product_id),
                quantity: p.quantity
            }
        })
    });

    try {
        await order.save();
    } catch (e) {
        return res.status(400).send(e);
    }

    res.send('Order created succesfully.');
});

module.exports = router;