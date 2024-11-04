const Questions = require("../models/question.model");

const getRandomQuestion = async (amount) => {
  if (typeof amount != number || amount <= 0) {
    throw new Error("Amount must be a positive number.");
  }

  const questions = await Questions.aggregate([{ $sample: { size: amount } }]);
  return questions;
};

module.exports = {
  getRandomQuestion,
};
