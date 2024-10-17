const { Schema } = require('mongoose')
const mongosse = require('../connection/mongodb.connection')

const categorySchema = new mongosse.Schema({
    category_name: {
        type: mongosse.SchemaTypes.String,
        required: true,
        unique: true
    },
    category_image: {
        type: mongosse.SchemaTypes.String,
        required: true,
        unique: true
    }
})

module.exports = mongosse.model('product_category', categorySchema)