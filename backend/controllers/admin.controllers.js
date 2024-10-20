const { mongoose } = require('mongoose')
const productModel = require('../model/product.model')
const product_category = require('../model/product.category.model')
const deleteImg = require('../services/deleteImg')

module.exports = {
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
            const { category_name } = req.body;
            // Delete Previous Image if new image Exists
            if (req.file?.filename) {
                const findcategory = await product_category.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
                deleteImg(`product_category_images/${findcategory.category_image}`)
            }
            // update product category
            const data = await product_category.findByIdAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { category_name, category_image: req.file?.filename },
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
            const data = await productModel.create({ product_name, product_description, product_price, product_category_id, product_image })
            if (!data) {
                deleteImg(`productImages/${req.file.filename}`)
                return res.status(204).json({ message: 'Unsuccessfull!' })
            }
            return res.status(201).json({ message: 'Successfull!' })
        } catch (error) {
            deleteImg(`productImages/${req.file?.filename}`)
            res.json({ message: 'Unsuccessfull!' })
            console.log('createProduct : ' + error.message)
        }
    }
}