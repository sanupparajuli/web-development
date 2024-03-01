const Joi = require('joi');
const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        review :'text',
        text: true, 
        minlength:5,
        maxlength:50,
        unique:true
    },
    desc:{
        type:String,
        review :'text',
        text: true, 
        required:true,
        minlength:5,
        maxlength:150
    },    
    price:{
        type:Number,
        required:true
    },    
    product_img:{
        type:String,
        required:false
    },
    prod_categories:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    }
});

const Products = mongoose.model('Products', ProductsSchema);

const validateProducts = (products) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        desc: Joi.string().min(5).max(150).required(),
        price: Joi.number().required(),
        prod_categories: Joi.required(),
        product_img: Joi.string(),
    })
    return schema.validate(products)
}

exports.Products = Products;
exports.validate = validateProducts;
