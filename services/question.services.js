const Questions = require('../models/question.model');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createPrompt } = require("../utils/aiPrompt")

const getRandomQuestion = async () => {

	const questions = await Questions.find();
	const randomIndex = Math.floor(Math.random() * questions.length);
	const randomQuestion = questions[randomIndex];
	return randomQuestion;
}

// Function to generate a multiple-choice question using the AI model
const getQuestionsFromAI = async (topic) => {
    const prompt = createPrompt(topic); // Create prompt with topic
    const genAI = new GoogleGenerativeAI(process.env.API_KEY); // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Define which model we are using

    try {
        const response = await model.generateContent(prompt); // Request content generation from the model
        const generatedText = response.response.text(); // Retrieve the generated text
        const jsonStart = generatedText.indexOf('{');
        const jsonEnd = generatedText.lastIndexOf('}') + 1;
        return JSON.parse(generatedText.slice(jsonStart, jsonEnd));
    } catch (error) {
        console.error("Error generating the question:", error.response ? error.response.data : error.message);
        throw error; 
    }
}

const generateQuestions = async (topic, amount = 1) => {
    if (topic.length < 2 || topic.length > 140) {
      throw new Error("Topic must be at least 2 characters and not exceed 140 characters.");
    }
  
    const questions = [];
  
    for (let i = 0; i < amount; i++) {
      const quizData = await getQuestionsFromAI(topic);
      questions.push({
        ...quizData,
        status: "pending",
      });
    }
  
    await Questions.insertMany(questions);
    return questions;
  };
  

module.exports = {
	getRandomQuestion,
	getQuestionsFromAI,
    generateQuestions
}