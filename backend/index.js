require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const cookie_parser = require('cookie-parser')
const AdminRoutes = require('./routes/admin.routes')
const siteRoutes = require('./routes/site.routes')


// middleware
app.use(cors())
app.use(cors(
    {
        origin: ['*'],
        methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
        credentials: true,
    }
))
app.use(cookie_parser())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/admin/api', AdminRoutes)
app.use('/api', siteRoutes)


app.listen('3000', () => console.log('Running!'))