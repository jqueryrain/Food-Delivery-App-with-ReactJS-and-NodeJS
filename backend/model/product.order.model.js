const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    customerDetails: {
        type: mongoose.Schema.Types.Object,
    },
    grandTotal: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    status: {
        type: mongoose.Schema.Types.String,
        default: 'processing'
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
            },
            total: {
                type: mongoose.Schema.Types.Number,
                default: 0
            }
        }
    },
    createdAt: {
        type: mongoose.Schema.Types.Date
    },
    payment: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
})

module.exports = mongoose.model('order', orderSchema)