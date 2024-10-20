const mongoose = require('../connection/mongodb.connection')

const productSchema = new mongoose.Schema({
    product_name: {
        type: mongoose.SchemaTypes.String,
        required: true,
        trim: true,
        unique: true
    },
    product_image: {
        type: mongoose.SchemaTypes.String,
    },
    product_description: {
        type: mongoose.SchemaTypes.String,
        required: true,
        trim: true,
    },
    product_category_id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    product_price: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
})

module.exports = mongoose.model('product', productSchema)