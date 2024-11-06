const express = require('express');

const router = express.Router();
const indexControllers = require('../controllers/index.controllers');

router.get('/api/v1/questions/random', indexControllers.getRandomQuestions);

router.get('/api/v1/questions/ai', indexControllers.getAiQuestions) 

module.exports = router;

