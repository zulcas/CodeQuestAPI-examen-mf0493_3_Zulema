
const questionService = require('../services/question.services')
const getRandomQuestions = async (req, res) => {
	try {
		let { amount } = req.query;
		amount = parseInt(amount, 10);

		//validation of amount
		if (isNaN(amount) || amount < 1) {
			amount = 10;
		} else if (amount > 30) {
			amount = 30;
		}

		const randomQuestion = await questionService.getRandomQuestion(amount);


		/* 	const totalQuestions = await Questions.countDocuments();
			if (totalQuestions === 0) {
				return res.status(404).json({
					message: "Question not found",
					results: []
				})
			} */


		res.status(200).json({
			message: "Random questions delivered successfully",
			results: randomQuestion
		});

	} catch (error) {
		res.status(500).json({
			message: "Error fetching random questions",


		})
	}

}

module.exports = { getRandomQuestions };
/* app.get('/api/v1/question/random', async (req, res) => {



}) */