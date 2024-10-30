const express = require('express');

const router = express.Router();
const indexControllers = require('../controllers/index.controllers');

router.get('/api/v1/question/random', indexControllers.getRandomQuestions);

router.get('/submit-new-question', indexControllers.newQuestionForm);

router.post('/submit-new-question', indexControllers.createNewQuestion);

module.exports = router;

