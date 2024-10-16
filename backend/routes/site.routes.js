const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const siteControllers = require('../controllers/site.conrollers')

const validationSchema = [
    body('username').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty()
]

router.post('/create/user', validationSchema, siteControllers.createUser)
router.post('/user/login', siteControllers.loginUser)

module.exports = router