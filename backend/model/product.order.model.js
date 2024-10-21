const mongoose = require('../connection/mongodb.connection')

const orderSchema = new mongoose.Schema({
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
            }
        }
    }
})

module.exports = mongoose.model('order', orderSchema)