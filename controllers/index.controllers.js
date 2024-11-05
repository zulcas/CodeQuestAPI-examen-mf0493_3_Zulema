
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

}

const newQuestionForm = (req, res) => {
	res.render('new-question');
};

const createNewQuestion = async (req, res) => {
	try {	
		await questionService.insertQuestion(req.body);
		console.log(req.body);
		res.status(201).json({ message: 'Pregunta guardada exitosamente.' });
	} catch {
		res.status(400).json({ error: 'Ha ocurrido un error al guardar la pregunta.' });
	}
	
};

module.exports = { 
	getRandomQuestions,
	newQuestionForm,
	createNewQuestion
 };
/* app.get('/api/v1/question/random', async (req, res) => {



}) */