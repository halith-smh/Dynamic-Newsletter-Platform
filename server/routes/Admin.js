const express = require('express');
const { dashboard, publishPost, tablePosts } = require('../controllers/Admin');


const router = express.Router();

router.get('/dashboard', dashboard);

router.patch('/publish', publishPost);

router.get('/table-posts', tablePosts);

module.exports = router