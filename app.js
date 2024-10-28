const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');


dotenv.config();

const app = express();


/*exports.postQuestion = async( req, res )=> {
	const { title, language, question, codeExamples, answerOptions } = req.body;

	const createdQuestion = await Question.create({
		title, 
		language, 
		question, 
		codeExamples, 
		answerOptions
	})

  
}*/



//-----------------------------DB Connect



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	connectDB();
	console.log(`Server listening in port ${PORT}`)
})
