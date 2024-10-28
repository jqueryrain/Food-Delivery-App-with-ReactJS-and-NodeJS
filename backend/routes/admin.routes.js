const express = require('express')
const router = express.Router()
const productConttrollers = require('../controllers/admin.controllers')
const { categoryImage, productImage } = require('../middleware/multer.middleware')
const adminControllers = require('../controllers/admin.controllers')

router.post('/authenticate/admin', adminControllers.handleAdminLogin)
router.post('/check/admin/token',adminControllers.verifyAdminToken)
// Routes for product categories
router.get('/get/product/category', productConttrollers.getAllcategoryData)
router.route('/product/category/:id?')
    .post(categoryImage.single('category_image'), productConttrollers.createProductCategory)
    .get(productConttrollers.getCategoryData)
    .delete(productConttrollers.deleteCategory)
    .put(categoryImage.single('category_image'), productConttrollers.updateCategory)

// Routes for Product
router.get('/get/products', productConttrollers.getAllProductData)
router.route('/product/:id?')
    .get(productConttrollers.getSingleProduct)
    .post(productImage.single('product_image'), productConttrollers.createProduct)
    .put(productImage.single('product_image'), productConttrollers.updateProduct)
    .delete(productConttrollers.deleteProduct)

router.get('/view/orders', productConttrollers.getorders)
router.put('/update/order/status/:id', productConttrollers.updateOrderStatus)
module.exports = router