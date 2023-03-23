const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()

router.get('/:username', userController.findUsersByUsername)
router.get('/all/username', userController.getAllUsername)
router.get('/', userController.getUserProfile)
router.put('/', userController.updateProfile)

module.exports = router