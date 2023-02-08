const express = require('express')
const userController = require('../controllers/user')
const router = express.Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.put('/', userController.updateData)

module.exports = router