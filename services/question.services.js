const Questions = require("../models/question.model");

/*
 * The getRandomQuestion function returns a random set of questions from the database.
 *
 * @param {number} amount - The number of questions to retrieve. Must be a positive number.
 * @returns {Promise<Array>} An array of random questions.
 * @throws {Error} Throws an error if the amount is not a positive number or if there's an error accessing the database.
 
 */

//getRAndomQuestion(1)
// getRandomQuestion(20)
// getRandomQuestion("patata")

const getRandomQuestion = async (amount) => {

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

module.exports = {
  getRandomQuestion,
};
