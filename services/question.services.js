const Questions = require('../models/question.model');

const getRandomQuestion = async () => {

	const questions = await Questions.find({codeExamples:[]});
	const randomIndex = Math.floor(Math.random() * questions.length);
	const randomQuestion = questions[randomIndex];
	return randomQuestion;
}
module.exports = {
	getRandomQuestion
}