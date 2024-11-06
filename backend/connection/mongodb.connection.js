const mongoose = require('mongoose')



mongoose.connect('mongodb+srv://krrishdhiman841:cVPJenu79CI15nXm@cluster0.mongodb.net/food_delivery?retryWrites=true&w=majority')
    .then(() => console.log("monogDB connected!"))
    .catch(() => console.log("Error connecting to MongoDB"))

module.exports = mongoose;