const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost:27017/food_delivery')
    .then(() => console.log("monogDB connected!"))
    .catch(() => console.log("Error connecting to MongoDB"))

module.exports = mongoose;