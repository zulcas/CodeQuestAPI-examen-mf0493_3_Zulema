const express = require('express');

const router = express.Router();
const indexControllers = require('../controllers/index.controllers');

router.get('/api/v1/question/random', indexControllers.getRandomQuestions);

module.exports = router;

