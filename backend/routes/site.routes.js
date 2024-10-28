const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const siteControllers = require('../controllers/site.conrollers')

const validationSchema = [
    body('username').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty()
]
router.post('/check/user/token', siteControllers.userAuthenticate)
router.post('/create/user', validationSchema, siteControllers.createUser)
router.post('/user/login', siteControllers.loginUser)
router.get('/get/product/category', siteControllers.getAllcategoryData)
router.get('/get/products/by/category/:id', siteControllers.getProductsByCategory)
router.get('/get/products', siteControllers.allProducts)
router.post('/product/cart', siteControllers.createProductCart)
router.post('/get/product/cart', siteControllers.getCartDetails)
router.put('/delete/product/cart/item/:id', siteControllers.deleteCartItem)
router.put('/update/product/cart/items', siteControllers.updateCartItem)
router.post('/payment', siteControllers.makePayment)
router.delete('/delete/order/:id/:success',siteControllers.deleteOrder)

module.exports = router