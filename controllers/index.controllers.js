
const questionService = require('../services/question.services')
const getRandomQuestions = async (req, res) => {
	try {

		const randomQuestion = await questionService.getRandomQuestion();


		/* 	const totalQuestions = await Questions.countDocuments();
			if (totalQuestions === 0) {
				return res.status(404).json({
					message: "Question not found",
					results: []
				})
			} */


		res.status(200).json({
			message: "Random question delivered successfully",
			results: randomQuestion
		});

	} catch (error) {
		res.status(500).json({
			message: "Error fetching random question",


		})
	}

};

const getTemplateQuestions = async (req, res) =>{

}

module.exports = { 
	getRandomQuestions,
	getTemplateQuestions
 };
/* app.get('/api/v1/question/random', async (req, res) => {



}) */