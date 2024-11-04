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

		let randomQuestions = []

		for (let i = 0; i < amount; i++) {
			const randomQuestion = await questionService.getRandomQuestion();
			randomQuestions.push(randomQuestion)
		}

		console.log("random questions", randomQuestions)

		res.status(200).json({
			message: "Random questions delivered successfully",
			results: randomQuestions
		});

	} catch (error) {
		res.status(500).json({
			message: "Error fetching random questions",
		})
	}
}

// Controller function to handle requests for generating AI-based questions
const getAiQuestions = async (req, res) => {

	// Get the topic from the query parameters, or set a default value
	const topic = req.query.topic || "Frontend and Backend programming";
  
	// Parse the "amount" query parameter, setting a default of 1 and ensuring it's between 1 and 10
	const amount = Math.min(Math.max(parseInt(req.query.amount) || 1, 1), 10);
  
	try {
	  // Call the generateQuestions service to create the specified number of questions based on the topic
	  const questions = await generateQuestions(topic, amount);
  
	  // Send a successful response with a message and the generated questions
	  return res.status(200).json({
		message: "Random question delivered successfully.",
		results: questions,
	  });
	} catch (error) {
	  // Log error details to the console for debugging
	  console.error(
		"Error generating the question:",
		error.response && error.response.data
		  ? error.response.data
		  : error.message
	  );
  
	  // Send a 400 error response with a custom error message if generation fails
	  return res.status(400).json({
		error: error.message || "An error occurred while generating the question.",
	  });
	}
  };

module.exports = { 
	getRandomQuestions,
	getAiQuestions
};
