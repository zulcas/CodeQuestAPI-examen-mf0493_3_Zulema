const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
const { getRandomQuestion } = require('./services/question.services');


dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.use(express.static('public'));

app.get('/daily-question', async (req, res) => {

  // Obtener la pregunta correspondiente al día
  const question = await getRandomQuestion();

  // Renderizar la página con la pregunta y las opciones
  res.render('home', { question });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening in port ${PORT}`)
})
