const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const orderSchema = mongoose.Schema({
    date: {
        type: Date,
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    products: [
        {
            product_id: {
                type: ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Order', orderSchema);