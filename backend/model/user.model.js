const mongoose = require('../connection/mongodb.connection')

const userSchema = mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        unique: true,
        required: true,
        match: [/^[a-z0-9]+@gmail.com$/]
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unqiue: true
    },
    type:{
        type: mongoose.SchemaTypes.String,
        default: 'user'
    }
})

module.exports = mongoose.model('user', userSchema)