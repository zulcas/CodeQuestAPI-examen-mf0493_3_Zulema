const Questions = require("../models/question.model");

const getRandomQuestion = async (amount) => {
	console.log("🚀 ~ getRandomQuestion ~ amount:", amount)
	
		if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
			throw new Error("Amount must be a positive number.");
		}
	
	  try {
		const questions = await Questions.aggregate([
		  { $sample: { size: amount } },
		]);
		return questions;
	  } catch (error) {
		throw new Error("Error fetching random questions from the database.");
	  }
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
