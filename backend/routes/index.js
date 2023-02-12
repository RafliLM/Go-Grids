const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')
const userController = require('../controllers/user')
const API = require('../controllers/journal');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/create', API.createJournal)
router.get('/all', API.getAllJournals)
router.get('/date/:date', API.getJournalsByDate)
router.use('/user', verifyToken, require('./user'))
router.use('/journal', verifyToken, require('./journal'))
router.use('/event', verifyToken, require('./event'))


module.exports = router