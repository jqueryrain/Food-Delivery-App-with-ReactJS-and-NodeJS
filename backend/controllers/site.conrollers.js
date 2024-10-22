const userModel = require('../model/user.model')
const productModel = require('../model/product.model')
const product_category = require('../model/product.category.model')
const product_cartModel = require('../model/product.cart.model')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { setUser, getUser } = require('../services/auth')
const mongoose = require('mongoose')

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
            if (!user) return res.json({ message: 'Not Found' })
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
            const username = getUser(req.body.token)
            const existingUserCart = await product_cartModel.find({ username })
            if (!existingUserCart) await product_cartModel.create({ username })
        } catch (error) {
            console.log('createProductCart : ' + error.message)
        }
    },
    updateCart: async (req, res) => {
        try {
            const username = getUser(req.body.token)
            const items = req.body.items.map(item => {
                return { product_id: new mongoose.Types.ObjectId(item.product_id) }
            })
            const data = await product_cartModel.updateOne(
                { username },
                { $set: { items } },
                { new: true }
            )
        } catch (error) {
            console.log('updateCart : ' + error.message)
        }
    },
    getCartDetails: async (req, res) => {
        try {
            const username = getUser(req.body.token)
            const data = await product_cartModel.aggregate([
                { $match: { username } },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'items.product_id',
                        foreignField: '_id',
                        as: 'product'
                    }
                }
            ])
            if (!data) return
            return res.status(200).json(data)
        } catch (error) {
            console.log('getCartDetails : ' + error.message)
        }
    }
}