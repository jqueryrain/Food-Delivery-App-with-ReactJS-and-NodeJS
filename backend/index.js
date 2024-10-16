require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const cookie_parser = require('cookie-parser')
const siteRoutes = require('./routes/site.routes')


// middleware
app.use(cors())
app.use(cookie_parser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api', siteRoutes)
app.listen(3000, () => console.log('Running!'))