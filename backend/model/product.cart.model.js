const mongoose = require('../connection/mongodb.connection')

const product_cartSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    grandTotal: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    items: {
        type: mongoose.Schema.Types.Array,
        required: true,
        item: {
            product_id: {
                type: mongoose.Schema.Types.ObjectId
            },
            quantity: {
                type: mongoose.Schema.Types.Number,
                default: 1
            }
        }
    }
})

module.exports = mongoose.model('product_cart', product_cartSchema)