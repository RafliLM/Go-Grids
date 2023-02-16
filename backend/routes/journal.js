const express = require('express')
const router = express.Router()
const API = require('../controllers/journal')

router.post('/create', API.createJournal)
router.get('/all', API.getAllJournals)
router.get('/date/:date', API.getJournalsByDate)
router.delete('/delete/:id', API.deleteJournals)
router.patch('/update/:id', API.updateJournal)



module.exports = router;