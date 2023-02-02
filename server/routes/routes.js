const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
// const multer = require('multer');

// multer middleware
// let storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname)
//     }
// })

// let upload = multer({
//     storage: storage,
// }).single("image")

router.get('/', API.fetchAllJournals)
router.get('/date/:date', API.fetchAllJournalsByDate)
router.get('/:id', API.fetchPostByID)
// router.post('/', upload, API.createJournals)
// router.patch('/:id', upload, API.manageJournals)
router.post('/', API.createJournals)
router.patch('/:id', API.manageJournals)
router.delete('/:id', API.deleteJournals)

module.exports = router;