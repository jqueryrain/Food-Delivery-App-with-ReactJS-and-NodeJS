const userModel = require('../model/user.model')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const { setUser } = require('../services/auth')

module.exports = {
    createUser: async (req, res) => {
        try {
            const result =  validationResult(req)
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
                console.log(true)
                const token = setUser(checkUserExists.username)
                return res.json({ message: 'User Authenticated!', token })
            }
        } catch (error) {
            console.log('loginUser  : ' + error.message)
        }
    }
}