const express = require('express');
const { addPost, verifyUpload } = require('../controllers/Posts');


const upload = require('../middleware/Upload')

const router = express.Router();

router.get('/dashboard', verifyUpload);
router.post('/add', upload.any(),addPost);

module.exports = router;