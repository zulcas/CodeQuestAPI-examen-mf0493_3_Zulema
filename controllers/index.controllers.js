const Questions = require('../models/question.model');

const getRandomQuestions = async (req, res) => {
	try {

		const questions = await Questions.find()



		const totalQuestions = await Questions.countDocuments();
		if (totalQuestions === 0) {
			return res.status(404).json({
				message: "Question not found",
				results: []
			})

		}


		const randomIndex = Math.floor(Math.random() * totalQuestions);
		const randomQuestion = questions[randomIndex];


		res.status(201).json({
			"message": "Random question delivered successfully",
			"results": randomQuestion
		});

	} catch (error) {
		res.status(500).json({
			error: "Error fetching random question",


		})
	}

}

module.exports = { getRandomQuestions };
/* app.get('/api/v1/question/random', async (req, res) => {



}) */