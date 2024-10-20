const express = require('express')
const router = express.Router()
const productConttrollers = require('../controllers/admin.controllers')
const { categoryImage, productImage } = require('../middleware/multer.middleware')

// Routes for product categories
router.get('/get/product/category', productConttrollers.getAllcategoryData)
router.route('/product/category/:id?')
    .post(categoryImage.single('category_image'), productConttrollers.createProductCategory)
    .get(productConttrollers.getCategoryData)
    .delete(productConttrollers.deleteCategory)
    .put(categoryImage.single('category_image'), productConttrollers.updateCategory)

// Routes for Product
router.route('/product/:id?')
    .post(productImage.single('product_image'), productConttrollers.createProduct)
module.exports = router