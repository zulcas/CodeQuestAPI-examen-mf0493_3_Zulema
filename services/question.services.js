const Questions = require('../models/question.model');

const getRandomQuestion = async () => {

	const questions = await Questions.find();
	const randomIndex = Math.floor(Math.random() * questions.length);
	const randomQuestion = questions[randomIndex];
	return randomQuestion;
}

const insertQuestion = async (q) => {
	// q -> question to be introduced
	try {
			await Questions.create({
				question: q.question,
				answerOptions: [{
					answer: q.answer1Text,
					isCorrect: q.answer1CheckBox? true : false 
				},
				{
					answer: q.answer2Text,
					isCorrect: q.answer2CheckBox? true : false 
				},
				{
					answer: q.answer3Text,
					isCorrect: q.answer3CheckBox? true : false 
				},
				{
					answer: q.answer4Text,
					isCorrect: q.answer4CheckBox? true : false 
				}],
				status: "pending"
			})
	} 
	catch {
		res.status(400).json({error: 'No se pudo introducir el elemento en la base de datos.'})
	}
}; 

const validateCheckboxNewQuestion = (obj) =>{
	//Function receives information from req.body and validates checkbox status 
	//1) Validate exists at least one correct answer
	const hasCorrectAnswer = Object.values(obj).some(element => {
		//If any checkbox (boolean data) is "true" we validate the answer as correct
		return (element == "true" && element)	
	});
	console.log(hasCorrectAnswer)
	return hasCorrectAnswer;
}

module.exports = {
	getRandomQuestion,
	insertQuestion, 
	validateCheckboxNewQuestion
}