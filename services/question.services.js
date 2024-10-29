const Questions = require('../models/question.model');

const getRandomQuestion = async () => {

	const questions = await Questions.find();
	const randomIndex = Math.floor(Math.random() * totalQuestions);
	const randomQuestion = questions[randomIndex];
	return randomQuestion;
}
module.exports = {
	getRandomQuestion
}