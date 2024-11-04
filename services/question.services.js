const Questions = require('../models/question.model');

const getRandomQuestion = async (amount) => {



		const questions = await Questions.aggregate([
			{ $match: { codeExamples: [] } }, 
			{ $sample: { size: amount } }   
		]);		
	
	return questions;
};
module.exports = {
	getRandomQuestion
}