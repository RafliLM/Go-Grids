const express = require('express')
const router = express.Router()
const API = require('../controllers/event');

router.get('/', API.getEvent)
router.post('/create', API.createEvent)
router.patch('/:id', API.updateEvent)
router.delete('/:id', API.deleteEvent)

module.exports = router
