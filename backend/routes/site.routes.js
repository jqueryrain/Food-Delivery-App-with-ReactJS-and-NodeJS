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
router.post('/create/product/cart', siteControllers.createProductCart)
router.put('/update/product/cart', siteControllers.updateCart)
router.post('/get/cart/details',siteControllers.getCartDetails)

module.exports = router