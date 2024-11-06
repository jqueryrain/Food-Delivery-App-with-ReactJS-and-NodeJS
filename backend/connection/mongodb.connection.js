const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://krrishdhiman841:Krish870@cluster0.w4lf3.mongodb.net/food_delivery')
    .then(() => console.log("monogDB connected!"))
    .catch(() => console.log("Error connecting to MongoDB"))


module.exports = mongoose;