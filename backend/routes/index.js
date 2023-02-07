const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/journal', require('./journal'))
router.use('/event', require('./event'))

module.exports = router