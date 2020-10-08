const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');
const ObjectId = require('mongoose').Types.ObjectId;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    weight: {
        type: Double,
        required: true
    },
    category_id: {
        type: ObjectId,
        ref: "Category",
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);