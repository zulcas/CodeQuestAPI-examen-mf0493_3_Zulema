
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
	let message = '';
	res.render('new-question', {message});
};

const createNewQuestion = async(req, res) => {
	try {
		//If validation of checkbox is passed
		console.log("esto es la validacion:", questionService.validateCheckboxNewQuestion(req.body))
		if(questionService.validateCheckboxNewQuestion(req.body)){
			await questionService.insertQuestion(req.body);
			console.log(req.body);
			let message = 'Thank you for submitting a new question. Our team will revise it and, if correct, include it in our database.';
			res.status(201).render('new-question.ejs', {message});
		}else{
			let message = 'We cannot save your question. You must mark at least one correct answer.'
			res.status(200).render('new-question.ejs', {message}); //Check status with Oscar

		}

		
		// let message = 'We cannot save your question. You must mark at least one correct answer.'
		// res.status(200).render('new-question.ejs', {message}); //Check status with Oscar

		
		// res.redirect('/submit-new-question');
	} catch (e) {
		console.log(e)
		res.status(400).json({ error: 'An error has ocurred while saving the question.' });
	}
	
};

module.exports = { 
	getRandomQuestions,
	newQuestionForm,
	createNewQuestion
 };
/* app.get('/api/v1/question/random', async (req, res) => {



}) */