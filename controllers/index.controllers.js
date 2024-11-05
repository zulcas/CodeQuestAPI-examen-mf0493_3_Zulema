const questionService = require("../services/question.services");

/**
 * Get random questions from the service.
 *
 * This function retrieves a specified number of random questions from the question service.
 * It validates the 'amount' query parameter, ensuring it is a valid number between 1 and 30.
 * If 'amount' is not provided or is invalid, a default value of 10 is used. The maximum number
 * of questions that can be requested is capped at 30 to prevent overloading the service.
 *
 * @async
 * @function getRandomQuestions
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the request.
 * @param {string} req.query.amount - The number of questions requested. This parameter is optional.
 * @param {Object} res - Express response object used to send back the response.
 * @returns {Promise<void>} Sends a JSON response with the requested random questions or an error message.
 *
 * @throws {Error} If an unexpected error occurs, a 500 status code is returned with the error message.
 */
const getRandomQuestions = async (req, res) => {
  try {
    let { amount } = req.query;
    amount = parseInt(amount, 10);

    //validation of amount
    if (isNaN(amount) || amount < 1) {
      amount = 10;
    } else if (amount > 30) {
      amount = 30;
    }

    const randomQuestion = await questionService.getRandomQuestion(amount);

    res.status(200).json({
      message: "Random questions delivered successfully",
      results: randomQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getRandomQuestions };
