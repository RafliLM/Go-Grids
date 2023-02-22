const express = require('express')
const router = express.Router()
const API = require('../controllers/journal')

router.post('/create', API.createJournal)
router.get('/all', API.getAllJournals)
router.get('/:date', API.getJournalsByDate)
router.delete('/:id', API.deleteJournals)
router.patch('/:id', API.updateJournal)

module.exports = router;