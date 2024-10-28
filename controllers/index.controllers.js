const Questions = require('../models/question.model');

const getRandomQuestions = async (req, res) => {
	const questions = await Questions.find()

	const totalQuestions = await Questions.countDocuments();
	const randomIndex = Math.floor(Math.random() * totalQuestions);
	const randomQuestion = questions[randomIndex];


	res.status(201).json({
		"message": "Random question delivered successfully",
		"Question": randomQuestion
	});

}

module.exports = { getRandomQuestions };
/* app.get('/api/v1/question/random', async (req, res) => {



}) */