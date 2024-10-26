const userModel = require('../model/user.model')
const productModel = require('../model/product.model')
const product_category = require('../model/product.category.model')
const product_cartModel = require('../model/product.cart.model')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { setUser, getUser } = require('../services/auth')
const mongoose = require('mongoose')
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
            const isMatch = await bcrypt.compare(password, checkUserExists.password)
            if (!isMatch) {
                return res.json({ message: 'User Not Authenticated!' })
            } else {
                const token = setUser(checkUserExists.username)
                return res.json({ message: 'User Authenticated!', token })
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
            const updatedItems = [...previousItems.items, { product_id: new ObjectId(req.body.Item.product_id) }]
            const UserPorductCart = await product_cartModel.findOneAndUpdate(
                { username: getUser(req.body.token) },
                { items: updatedItems }
            )
            if (!UserPorductCart) return res.json(false)
            return res.json(true)
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
    }
}