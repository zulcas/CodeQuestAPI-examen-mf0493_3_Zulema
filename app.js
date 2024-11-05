const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const { getRandomQuestion } = require('./services/question.services');


dotenv.config();

const app = express();
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.get('/daily-question', async (req, res) => {

  // Obtener la pregunta correspondiente al día
  const questions = await getRandomQuestion(20);
  const questionsWithShuffledAnswers = questions.map(question => {
    return {
        ...question,
        answerOptions: MezclarArray(question.answerOptions)
    };
});
  // Renderizar la página con la pregunta y las opciones
  res.render('home',  {questionsWithShuffledAnswers} );
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening in port ${PORT}`)
})

//funcion para mezclar las respuestas
const MezclarArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};