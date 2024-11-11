const express = require('express');

const router = express.Router();
const apiControllers = require('../controllers/api.controllers');

router.get('/v1/questions/random', apiControllers.getRandomQuestions);

router.get('/v1/questions/ai', apiControllers.getAiQuestions) 

module.exports = router;

