const express = require("express");
const { connectDB } = require("./utils/db");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index.routes");
const apiRouter = require("./routes/api.routes");
const { getRandomQuestion, getRandomQuestionWithoutCodeExamples } = require('./services/question.services');
const { shuffleArray } = require('./utils/utils')

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.get('/daily-question', async (req, res) => {

  // Obtener la pregunta correspondiente al día
  const questions = await getRandomQuestionWithoutCodeExamples();
  const questionsWithShuffledAnswers = questions.map(question => {
    return {
        ...question,
        answerOptions: shuffleArray(question.answerOptions)
    };
});
  // Renderizar la página con la pregunta y las opciones
  res.render('home',  {questionsWithShuffledAnswers} );
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening in port ${PORT}`);
});
