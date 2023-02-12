const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/journal', require('./journal'))
router.use('/event', require('./event'))
router.post('/create', API.createJournal)

module.exports = router