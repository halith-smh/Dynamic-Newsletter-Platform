const express = require("express");
const {getNewsletter, checkIfUserLiked, handlePostLike} = require("../controllers/Public");

const router = express.Router();

router.get('/newsletter/:id', getNewsletter);

router.get('/newsletter/check-like/:id', checkIfUserLiked);
router.patch('/newsletter/like/:id', handlePostLike);

module.exports = router;