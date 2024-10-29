const userModel = require('../model/user.model')
const productModel = require('../model/product.model')
const product_category = require('../model/product.category.model')
const product_cartModel = require('../model/product.cart.model')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { setUser, getUser } = require('../services/auth')
const mongoose = require('mongoose')
const productOrderModel = require('../model/product.order.model')
const stripe = require('stripe')(`${process.env.STRIPE_SK}`)
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    createUser: async (req, res) => {
        try {
            const result = validationResult(req)
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))

            if (!result.isEmpty()) {
                res.json({ message: 'Unsuccessful!' })
            } else {
                const user = await userModel.create({ username, email, password: hashedPassword })
                const token = setUser(username)
                if (!user) res.json({ message: 'Unsuccessful!' })
                return res.json({ message: 'Successful!', token })
            }
        } catch (error) {
            console.log('createUser : ' + error.message);
        }
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const checkUserExists = await userModel.findOne({ email })
            if (!checkUserExists) return res.status(200).json({ message: 'NotFound' })

            const isMatch = await bcrypt.compare(password, checkUserExists.password)
            if (!isMatch) {
                return res.json({ message: 'User Not Authenticated!' })
            } else {
                const token = setUser(checkUserExists.username)
                return res.status(200).json({ message: 'User Authenticated!', token })
            }
        } catch (error) {
            console.log('loginUser  : ' + error.message)
        }
    },
    userAuthenticate: async (req, res) => {
        try {
            const user = getUser(req.body.token)
            if (!user) return res.json({ message: 'Please Login' })
            return res.json({ message: 'User Authenticated!' })
        } catch (error) {
            console.log('userAuthenticate : ' + error.message)
        }
    },
    getAllcategoryData: async (req, res) => {
        try {
            // get all the data of product category
            const data = await product_category.find({})
            // send Response
            if (!data || data.length == 0) return res.status(200).json({ message: 'Not Found' })
            return res.status(200).json(data)
        } catch (error) {
            console.log('getcategoryData : ' + error.message)
        }
    },
    getProductsByCategory: async (req, res) => {
        try {
            const data = await product_category.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(req.params.id)
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: 'product_category_id',
                        as: 'categoryproducts'
                    }
                },
                { $project: { categoryproducts: 1 } }
            ])
            return res.status(200).json(data[0])
        } catch (error) {
            console.log('getProductsByCategory : ' + error.message)
        }
    },
    allProducts: async (req, res) => {
        try {
            const data = await productModel.find({})
            if (!data) res.status(204).json({ message: 'Not Found' })
            return res.status(200).json(data)
        } catch (error) {
            console.log('allProducts : ' + error.message)
        }
    },
    createProductCart: async (req, res) => {
        try {
            const previousItems = await product_cartModel.findOne({ username: getUser(req.body.token) })
            if (!previousItems) {
                await product_cartModel.create({
                    username: getUser(req.body.token),
                    items: [{
                        product_id: new ObjectId(req.body.Item.product_id)
                    }]
                })
            } else {
                const updatedItems = [...previousItems.items, { product_id: new ObjectId(req.body.Item.product_id) }]
                const UserPorductCart = await product_cartModel.findOneAndUpdate(
                    { username: getUser(req.body.token) },
                    { items: updatedItems }
                )
                if (!UserPorductCart) return res.json(false)
                return res.json(true)
            }
        } catch (error) {
            console.log('createProductCart : ' + error.message)
        }
    },
    getCartDetails: async (req, res) => {
        try {
            const username = getUser(req.body.token)
            const data = await product_cartModel.aggregate([
                {
                    $match: { username }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'items.product_id',
                        foreignField: '_id',
                        as: 'product'
                    }
                }
            ])
            if (data) {
                return res.status(200).json(data)
            } else {
                return false
            }
        } catch (error) {
            console.log('getCartDetails : ' + error.message)
        }
    },
    deleteCartItem: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const userCart = await product_cartModel.findOne({ username: getUser(token) })
            if (userCart) {
                const updatedItems = userCart.items.filter(item => !item.product_id.equals(req.params.id))
                const UserPorductCart = await product_cartModel.findOneAndUpdate(
                    { username: getUser(token) },
                    { items: updatedItems }
                )
                if (!UserPorductCart) return res.json(false)
                return res.json(true)
            }

        } catch (error) {
            console.log('deleteCartItem : ' + error.message)
        }
    },
    updateCartItem: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const items = req.body.items.map(item => {
                return {
                    product_id: new ObjectId(item.id),
                    total: item.total,
                    quantity: item.quantity
                }
            })
            const UserPorductCart = await product_cartModel.findOneAndUpdate(
                { username: getUser(token) },
                { items, grandTotal: req.body.grandTotal }
            )
            if (!UserPorductCart) return res.json(false)
            return res.status(200).json({ grandTotal: UserPorductCart.grandTotal })
        } catch (error) {
            console.log('updateCartItem : ' + error.message)
        }
    },
    makePayment: async (req, res) => {
        try {
            const data = await product_cartModel.aggregate([
                { $match: { username: getUser(req.body.token) } },
                {
                    $lookup: {
                        from: 'products', localField: 'items.product_id',
                        foreignField: '_id', as: 'product'
                    }
                }
            ])
            if (data) {
                const order = await productOrderModel.create({
                    username: getUser(req.body.token),
                    items: data[0].items,
                    createdAt: new Date(),
                    customerDetails: req.body.FormData,
                    grandTotal: data[0].grandTotal
                })
                const linesItems = data[0].product.map((item, i) => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.product_name,
                            images: [item.product_image],
                        },
                        unit_amount: item.product_price * 100,
                    },
                    quantity: data[0].items[i].quantity
                }))
                const paymentIntent = await stripe.checkout.sessions.create({
                    line_items: linesItems,
                    mode: 'payment',
                    success_url: `http://localhost:5173/success?success=true&orderId=${order._id}`,
                    cancel_url: `http://localhost:5173/cancel?success=false&orderId=${order._id}`,
                    customer_email: 'demo@gmail.com'
                })
                return res.status(200).json(paymentIntent)
            }
        } catch (error) {
            console.log('makePayment : ' + error.message)
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const param1 = req.params.success;
            const param2 = 'true';
            if (param1 !== param2) {
                await productOrderModel.findByIdAndDelete(
                    { _id: new ObjectId(req.params.id) }
                )
            }
        } catch (error) {
            console.log('deleteOrder : ' + error.message)
        }
    }
}