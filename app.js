const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Questions = require('./models/question.model');

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

    res.status(201).json({
        "message": "Question created successfully", 
        "createdQuestion": createdQuestion
    });
}*/
//------------------------Ejemplo de Óscar
app.get('/api/v1/question/random', async (req, res) => {

    const questions = await Questions.find()
    console.log(questions);
    res.json({questions});
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
