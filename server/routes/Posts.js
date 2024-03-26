const express = require('express');
const { addPost } = require('../controllers/Posts');


const upload = require('../middleware/Upload')

const router = express.Router();

router.post('/add', upload.any(),addPost);

module.exports = router;