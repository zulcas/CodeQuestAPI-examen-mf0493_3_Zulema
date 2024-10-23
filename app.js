const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


exports.postQuestion = async( req, res )=> {
    const { title, language, question, codeExamples, answerOptions } = req.body;

    const createdQuestion = await Question.create({
        title, 
        language, 
        question, 
        codeExamples, 
        answerOptions
    })

    res.status(201).json({
        "message": "Question created successfully", 
        "createdQuestion": createdQuestion
    });
}
//------------------------Ejemplo de Óscar
app.get('/api/v1/question/random', (req, res) => {
	res.json({
		"question": "What is the result of `2 + 2` in JavaScript?",
		"options": [
			{ "text": "3", "correct": false },
			{ "text": "4", "correct": true },
			{ "text": "22", "correct": false },
			{ "text": "NaN", "correct": false }
		]
	})
})

//-----------------------------DB Connect
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexión a la base de datos realizada con éxito');
    } catch (error) {
        console.error(`Ha ocurrido el siguiente error: ${error.message}`);
    }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening in port ${PORT}`)
})
