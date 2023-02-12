const express = require('express')
const router = express.Router();
const API = require('../controllers/journal');


router.get('/date/:date', API.getJournalsByDate)
router.patch('/:id', API.updateJournal)
router.delete('/:id', API.deleteJournals)

module.exports = router;