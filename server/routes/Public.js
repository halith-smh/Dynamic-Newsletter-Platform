const express = require("express");
const {getNewsletter, checkIfUserLiked, handlePostLike, profile, updateProfile, getReaders} = require("../controllers/Public");

const router = express.Router();

//newsletter
router.get('/newsletter/:id', getNewsletter);
//newsletter likes
router.get('/newsletter/check-like/:id', checkIfUserLiked);
router.patch('/newsletter/like/:id', handlePostLike);

//profile
router.get('/profile', profile);
router.patch('/profile', updateProfile);

//top-readers
router.get('/top-readers', getReaders);

module.exports = router;