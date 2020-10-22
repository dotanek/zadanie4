const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// Product

const productCommonFields = {
    name: Joi.string()
        .min(1)
        .required(),

    description: Joi.string()
        .min(1)
        .required(),

    price: Joi.number()
        .greater(0)
        .required(),

    weight: Joi.number()
        .greater(0)
        .required(),

    category_id: Joi.objectId()
        .required()
}

const productCreateSchema = Joi.object({
    ...productCommonFields
});

const productUpdateSchema = Joi.object({
    ...productCommonFields
}).fork(['name','description','price','weight','category_id'], (schema) => schema.optional());

function validateCreateProduct(product) {
    return productCreateSchema.validate(product);
}

function validateUpdateProduct(product) {
    return productUpdateSchema.validate(product);
}

module.exports.validateCreateProduct = validateCreateProduct;
module.exports.validateUpdateProduct = validateUpdateProduct;

// Order

const orderCommonFields = {
    date: Joi.date(),

    username: Joi.string()
        .min(1)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    phone: Joi.string()
        .min(1)
         .regex(/^[0-9]*$/)
         .required(),
        
    products: Joi.array().items(
        {
            product_id: Joi.objectId()
                .required(),
    
            quantity: Joi.number()
                .integer()
                .greater(0)
                .required()
        }
    )
    .min(1)
    .required()
}

const orderCreateSchema = Joi.object({
    ...orderCommonFields
});

const orderUpdateSchema = Joi.object({
    status_id: Joi.objectId()
        .required()
});

function validateCreateOrder(order) {
    return orderCreateSchema.validate(order);
}

function validateUpdateOrder(order) {
    return orderUpdateSchema.validate(order);
}

module.exports.validateCreateOrder = validateCreateOrder;
module.exports.validateUpdateOrder = validateUpdateOrder;