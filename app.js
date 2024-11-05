const express = require("express");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv");
const indexRouter = require("./routes/index");
const { getRandomQuestion } = require("./services/question.services");

dotenv.config();

const app = express();
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.get("/daily-question", async (req, res) => {
  // Get the question corresponding to the day
  const questions = await getRandomQuestion(1);

  //Extract the first element of array
  const question = questions[0];

  // Renderizar la página con la pregunta y las opciones
  res.render("home", { question });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening in port ${PORT}`);
});
