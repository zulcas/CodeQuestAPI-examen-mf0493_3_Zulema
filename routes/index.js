const express = require('express');

const router = express.Router();
const indexControllers = require('../controllers/index.controllers');

router.get('/api/v1/question/random', indexControllers.getRandomQuestions);

router.get('/template-form', indexControllers.getFormTemplate )

router.get('/export-kahoot-questions', indexControllers.getTemplateQuestionsKahoot);

router.get('/export-kahoot-questions', indexControllers.getTemplateQuestionsBlooket)



module.exports = router;

