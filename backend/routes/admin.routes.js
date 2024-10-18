const express = require('express')
const router = express.Router()
const productConttrollers = require('../controllers/admin.controllers')
const { categoryImage } = require('../middleware/multer.middleware')


router.get('/get/product/category', productConttrollers.getcategoryData)
router.route('/product/category/:id?')
    .post(categoryImage.single('category_image'), productConttrollers.createProductCategory)
    .get(productConttrollers.getCategoryData)
    .delete(productConttrollers.deleteCategory)
    .put(categoryImage.single('category_image'),productConttrollers.updateCategory)


module.exports = router