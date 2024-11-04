const questionService = require('../services/question.services')
const { generateQuestions } = require('../services/question.services');



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

// Logic to get the generated question from the AI
const getAiQuestions = async (req, res) => {
	const topic = req.query.topic || "Frontend and Backend programming";
	const amount = Math.min(Math.max(parseInt(req.query.amount) || 1, 1), 10);
  
	try {
	  const questions = await generateQuestions(topic, amount);
  
	  return res.status(200).json({
		message: "Random question delivered successfully",
		results: questions,
	  });
	} catch (error) {
	  console.error(
		"Error generating the question:",
		error.response && error.response.data
		  ? error.response.data
		  : error.message
	  );
	  return res.status(400).json({
		error: error.message || "An error occurred while generating the question.",
	  });
	}
  };

  
module.exports = { 
	getRandomQuestions,
	getAiQuestions
};
