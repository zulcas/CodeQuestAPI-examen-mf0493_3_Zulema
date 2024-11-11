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
		await Questions.create(q)
	}
	catch {
		throw new Error('We could not create the question.');
	}
};

module.exports = {
	getRandomQuestion,
	insertQuestion,
}