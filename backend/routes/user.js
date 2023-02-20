const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()

router.get('/:username', userController.findUsersByUsername)
router.get('/profile', userController.getUserProfile)
router.put('/update', userController.updateProfile)

module.exports = router