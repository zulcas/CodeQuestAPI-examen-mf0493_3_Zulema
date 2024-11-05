const Questions = require('../models/question.model');

const getRandomQuestion = async (amount) => {
		const questions = await Questions.aggregate([ 
			{ $sample: { size: amount } }   
		]);		
	
	return questions;
};

const getRandomQuestionWithoutCodeExamples = async () => {
	const questions = await Questions.aggregate([
		{ $match: { codeExamples: [] } }, 
		{ $sample: { size: 1 } } 
	]);		

return questions;
};

module.exports = {
	getRandomQuestion,
	getRandomQuestionWithoutCodeExamples
}