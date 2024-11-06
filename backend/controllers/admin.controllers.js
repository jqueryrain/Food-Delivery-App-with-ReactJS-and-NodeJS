const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const product_orderModel = require('../model/product.order.model')
const productModel = require('../model/product.model')
const userModel = require('../model/user.model')
const product_category = require('../model/product.category.model')
const deleteImg = require('../services/deleteImg')
const { getUser, setUser } = require('../services/auth')
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    handleAdminLogin: async (req, res) => {
        try {
            const { email, password } = req.body.FormData;
            const checkUserExists = await userModel.findOne({ email })
            const isMatch = await bcrypt.compare(password, checkUserExists.password)

            if (isMatch && checkUserExists.type == 'admin') {
                const token = setUser(checkUserExists.username)
                return res.status(200).json({ message: 'User Authenticated!', token })
            } else {
                return res.status(204).json({ message: 'User Not Authenticated!' })
            }

        } catch (error) {
            console.log('handleAdminLogin : ' + error.message)
        }
    },
    verifyAdminToken: async (req, res) => {
        try {
            const Admin = await userModel.findOne({ username: getUser(req.body.token) })
            if (Admin && Admin.type == 'admin') {
                return res.status(200).json({ message: 'User Authenticated!' })
            } else {
                return res.status(204).json({ message: 'User Not Authenticated!' })
            }
        } catch (error) {
            console.log('verifyAdminToken : ' + error.message)
        }
    },
    createProductCategory: async (req, res) => {
        try {
            // create product category
            const data = await product_category.create({
                category_image: req.file.filename,
                category_name: req.body.category_name,
            })
            // send response
            if (!data || !req.file.filename) deleteImg(`product_category_images/${req.file?.filename}`)
            return res.status(200).json({ message: 'Successfully created!' })
        } catch (error) {
            deleteImg(`product_category_images/${req.file.filename}`)
            console.log('createProductCategory : ' + error.message)
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
    deleteCategory: async (req, res) => {
        try {
            // delete product category image
            const findcategory = await product_category.findOne({
                _id: new mongoose.Types.ObjectId(req.params.id)
            })
            deleteImg(`product_category_images/${findcategory.category_image}`)
            // delete product category
            const data = await product_category.findByIdAndDelete({
                _id: new mongoose.Types.ObjectId(req.params.id)
            })
            // send Response
            if (!data) return res.status(200).json({ message: 'Not Found' })
            return res.status(200).json({ message: 'Successfully deleted!' })
        } catch (error) {
            console.log('deleteCategory : ' + error.message)
        }
    },
    getCategoryData: async (req, res) => {
        try {
            // get single data of product category
            const data = await product_category.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
            if (!data) return res.status(200).json({ message: 'Not Found' })
            // send Response
            return res.status(200).json(data)
        } catch (error) {
            console.log('getCategoryData : ' + error.message)
        }
    },
    updateCategory: async (req, res) => {
        try {
            console.log(req.body);

            const { category_name } = req.body;
            // Delete Previous Image if new image Exists
            if (req.file?.filename) {
                const findcategory = await product_category.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
                deleteImg(`product_category_images/${findcategory.category_image}`)
                if (!findcategory.category_image) return;
            }
            // update product category
            const data = await product_category.findByIdAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { category_name: category_name[0], category_image: req.file?.filename },
                { new: true }
            )
            // if category not updated
            if (!data) {
                deleteImg(`product_category_images/${req.file?.filename}`)
                return res.json({ message: 'update unsuccessful!' })
            }
            return res.status(200).json({ message: 'update successful!' })
        } catch (error) {
            deleteImg(`product_category_images/${req.file?.filename}`)
            console.log('updateCategory : ' + error.message)
        }
    },

    // Product Controllers
    createProduct: async (req, res) => {
        try {
            const product_image = req.file?.filename;
            const { product_name, product_description, product_price, product_category_id } = req.body;
            const data = await productModel.create(
                {
                    product_name, product_description, product_price,
                    product_category_id: new ObjectId(product_category_id), product_image
                })
            if (!data) {
                deleteImg(`productImages/${req.file.filename}`)
                return res.status(204).json({ message: 'Unsuccessfull!' })
            }
            return res.status(201).json({ message: 'Successfull!' })
        } catch (error) {
            deleteImg(`productImages/${req.file?.filename}`)
            console.log('createProduct : ' + error.message)
            return res.json({ message: 'Unsuccessfull!' })
        }
    },
    getAllProductData: async (req, res) => {
        try {
            const data = await productModel.aggregate([
                {
                    $lookup: {
                        from: 'product_categories',
                        localField: 'product_category_id',
                        foreignField: '_id',
                        as: 'product_category'
                    }
                },
                { $unwind: '$product_category' },
                {
                    $project: {
                        'product_category.category_image': 0,
                        'product_category._id': 0
                    }
                }
            ])
            if (data.length == 0) return res.status(204).json({ message: 'Not Found' })
            return res.status(200).json(data)
        } catch (error) {
            console.log('getAllProductData : ' + error.message)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const existingProduct = await productModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
            deleteImg(`productImages/${existingProduct.product_image}`)
            const data = await productModel.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
            if (!data) return res.status(204).json({ message: 'Failed!' })
            return res.status(200).json({ message: 'Successfully Deleted!' })
        } catch (error) {
            console.log('deleteProduct : ' + error.message)
        }
    },
    getSingleProduct: async (req, res) => {
        try {
            const data = await productModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(req.params.id)
                    }
                },
                {
                    $lookup: {
                        from: 'product_categories',
                        localField: 'product_category_id',
                        foreignField: '_id',
                        as: 'product_category'
                    }
                },
                { $unwind: '$product_category' },
                {
                    $project: {
                        'product_category.category_image': 0,
                    }
                }
            ])
            if (!data) return res.status(204).json({ message: 'Not Found' })
            return res.status(200).json(data)
        } catch (error) {
            console.log('getSingleProduct : ' + error.message)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { product_name, product_category_id, product_description, product_price } = req.body;
            if (req.file?.filename) {
                const existingProduct = await productModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
                deleteImg(`productImages/${existingProduct?.product_image}`)
                if (!existingProduct.product_image) return;
            }

            // update  product
            const data = await productModel.findByIdAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                {
                    product_name,
                    product_category_id: new mongoose.Types.ObjectId(product_category_id),
                    product_description,
                    product_image: req.file?.filename,
                    product_price
                },
                { new: true }
            )
            if (!data) return res.status(204).json({ message: 'Failed!' })
            return res.status(200).json({ message: 'Successfully updated!' })
        } catch (error) {
            deleteImg(`productImages/${req.file?.filename}`)
            console.log('updateProduct : ' + error.message)
        }
    },
    getorders: async (req, res) => {
        try {
            const data = await product_orderModel.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: 'items.product_id',
                        foreignField: '_id',
                        as: 'product'
                    }
                }
            ])
            if (data.length > 0) return res.status(200).json(data)
        } catch (error) {
            console.log('getorders : ' + error.message)
        }
    },
    updateOrderStatus: async (req, res) => {
        try {
            const data = await product_orderModel.findByIdAndUpdate(
                { _id: new ObjectId(req.params.id) },
                { status: req.body.status }
            )
            if (!data) return res.status(204).json(false)
            return res.status(200).json(true);
        } catch (error) {
            console.log('updateOrderStatus : ' + error.message)
        }
    }
}