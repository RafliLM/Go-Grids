const express = require('express')
const router = express.Router()
const API = require('../controllers/event');

router.get('/', API.getAllEvents)
router.get('/today', API.getTodayEvents)
router.post('/', API.createEvent)
router.patch('/:id', API.updateEvent)
router.delete('/:id', API.deleteEvent)
router.patch('/accept/:id', API.acceptEvent)
router.patch('/decline/:id', API.declineEvent)

module.exports = router
