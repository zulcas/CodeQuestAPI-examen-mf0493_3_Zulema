const Questions = require('../models/question.model');

const getRandomQuestion = async (amount) => {


	/* const questions = await Questions.find();
		const randomIndex = Math.floor(Math.random() * questions.length);
		const randomQuestion = questions[randomIndex];
		return randomQuestion; */


	const questions = await Questions.aggregate([
		{ $sample: { size: amount } }
	]);
	return questions;
};



module.exports = {
	getRandomQuestion
}