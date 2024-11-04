const express = require('express');

const router = express.Router();
const indexControllers = require('../controllers/index.controllers');

router.get('/api/v1/question/random', indexControllers.getRandomQuestions);

router.get('/api/v1/question/ai', indexControllers.getAiQuestions) 

module.exports = router;

