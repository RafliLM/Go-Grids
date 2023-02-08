const express = require('express')
const router = express.Router();
const API = require('../controllers/journal');


router.get('/', API.getAllJournals)
router.get('/date/:date', API.getJournalsByDate)
router.post('/create', API.createJournal)
router.patch('/:id', API.updateJournal)
router.delete('/:id', API.deleteJournals)

module.exports = router;