require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api', require('./routes/index'))

app.listen((PORT) => {
    console.log(`Server listening on port ${PORT}`)
})