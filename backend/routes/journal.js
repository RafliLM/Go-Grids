const express = require('express')
const router = express.Router();
const API = require('../controllers/journal');



router.patch('/:id', API.updateJournal)

module.exports = router;