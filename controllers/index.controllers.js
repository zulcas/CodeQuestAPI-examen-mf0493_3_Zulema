const questionService = require("../services/question.services");
const xlsx = require("xlsx");
const path = require("path");

const getRandomQuestions = async (req, res) => {
  try {
    const randomQuestion = await questionService.getRandomQuestion();

    /* 	const totalQuestions = await Questions.countDocuments();
			if (totalQuestions === 0) {
				return res.status(404).json({
					message: "Question not found",
					results: []
				})
			} */

    res.status(200).json({
      message: "Random question delivered successfully",
      results: randomQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching random question",
    });
  }
};

const getTemplateQuestions = async (req, res) => {
  const randomQuestion = await questionService.getRandomQuestion();
  console.log("🚀 ~ getTemplateQuestions ~ randomQuestion:", randomQuestion);

  //lee el template
  const originalFilePath = "./resources/kahoot-template.xlsx";
  const workbook = xlsx.readFile(originalFilePath);

 // creamos el nuevo documento 
 
  const worksheet = workbook.Sheets["Sheet1"];
  const newWorkbook = xlsx.utils.book_new();

  // Agregar la copia de la hoja al nuevo archivo
  xlsx.utils.book_append_sheet(newWorkbook, worksheet, "Sheet1");

  const correctIndex = randomQuestion.answerOptions.findIndex(
    (option) => option.isCorrect
  );
  console.log("🚀 ~ getTemplateQuestions ~ correctIndex:", correctIndex);
  const correctAnswerNumber = correctIndex + 1;

  newWorkbook.Sheets["Sheet1"]["B9"] = { v: randomQuestion.question, t: "s" };
  newWorkbook.Sheets["Sheet1"]["D9"] = { v: randomQuestion.answerOptions[1].answer, t: "s" };
  newWorkbook.Sheets["Sheet1"]["E9"] = { v: randomQuestion.answerOptions[2].answer, t: "s" };
  newWorkbook.Sheets["Sheet1"]["F9"] = { v: randomQuestion.answerOptions[3].answer, t: "s" };
  newWorkbook.Sheets["Sheet1"]["C9"] = { v: randomQuestion.answerOptions[0].answer, t: "s" };
  newWorkbook.Sheets["Sheet1"]["G9"] = { v: 30, t: "n" };
  newWorkbook.Sheets["Sheet1"]["H9"] = { v: correctAnswerNumber, t: "s" };

  const newFilePath = './resources/temporary_excel.xlsx' 
  xlsx.writeFile(newWorkbook, newFilePath);

  console.log(`Archivo Excel guardado correctamente en ${newFilePath}`);
};

module.exports = {
  getRandomQuestions,
  getTemplateQuestions,
};
/* app.get('/api/v1/question/random', async (req, res) => {



}) */
