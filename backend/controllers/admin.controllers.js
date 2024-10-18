const { mongoose } = require('mongoose')
const product_category = require('../model/product.category.model')
const deleteImg = require('../services/deleteImg')

module.exports = {
    createProductCategory: async (req, res) => {
        try {
            const data = await product_category.create({
                category_image: req.file?.filename,
                category_name: req.body.category_name,
            })
            if (!data || !req.file.filename) deleteImg(`product_category_images/${req.file?.filename}`)
            return res.status(200).json({ message: 'Successfully created!' })
        } catch (error) {
            deleteImg(`product_category_images/${req.file?.filename}`)
            console.log('createProductCategory : ' + error.message)
        }
    },
    getcategoryData: async (req, res) => {
        try {
            const data = await product_category.find({})
            if (!data || data.length == 0) return res.status(200).json({ message: 'Not Found' })
            return res.status(200).json(data)
        } catch (error) {
            console.log('getcategoryData : ' + error.message)
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const findcategory = await product_category.findOne({
                _id: new mongoose.Types.ObjectId(req.params.id)
            })

            const data = await product_category.findByIdAndDelete({
                _id: new mongoose.Types.ObjectId(req.params.id)
            })
            if (!data) return res.status(200).json({ message: 'Not Found' })
            deleteImg(`product_category_images/${findcategory.category_image}`)
            return res.status(200).json({ message: 'Successfully deleted!' });
        } catch (error) {
            console.log('deleteCategory : ' + error.message)
        }
    },
    getCategoryData: async (req, res) => {
        try {
            const data = await product_category.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
            if (!data) return res.status(200).json({ message: 'Not Found' })
            return res.status(200).json(data)
        } catch (error) {
            console.log('getCategoryData : ' + error.message)
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { category_name } = req.body;
            const updated_image = req.file?.filename;

            if (updated_image != undefined) {
                const findcategory = await product_category.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
                deleteImg(`product_category_images/${findcategory.category_image}`)
            }

            const data = await product_category.findByIdAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.params.id) },
                { category_name, category_image: updated_image },
                { new: true }
            )
            if (!data) {
                deleteImg(`product_category_images/${updated_image}`)
                return res.json({ message: 'update unsuccessful!' })
            }
            return res.status(200).json({ message: 'update successful!' })
        } catch (error) {
            deleteImg(`product_category_images/${req.file?.filename}`)
            console.log('updateCategory : ' + error.message)
        }
    }
}