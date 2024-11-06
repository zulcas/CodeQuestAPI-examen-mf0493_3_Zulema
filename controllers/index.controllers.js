const questionService = require("../services/question.services");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

const getFormTemplate = async (req, res) => {
  res.render("template-form", {});
};

const getTemplateQuestions = async (req, res) => {
  const { numberQuestions } = req.query;

  const templateType = req.query.templateType;

  let row = templateType == "excel" ? 9 : 3;
  console.log("🚀 ~ getTemplateQuestions ~ row:", row);

  //lee el template
  const originalFilePath =
    templateType == "excel"
      ? "./resources/kahoot-template.xlsx"
      : "./resources/blooket-template.xlsx";
  const workbook = xlsx.readFile(originalFilePath);

  // creamos el nuevo documento

  const worksheet = workbook.Sheets["Sheet1"];
  const newWorkbook = xlsx.utils.book_new();

  // Agregar la copia de la hoja al nuevo archivo
  xlsx.utils.book_append_sheet(newWorkbook, worksheet, "Sheet1");

  const randomQuestions = await questionService.getRandomQuestion(Number(numberQuestions));
  console.log("🚀 ~ getTemplateQuestions ~ randomQuestions:", randomQuestions.length)


  for (let i = 0; i < randomQuestions.length; i++) {

	const randomQuestion = randomQuestions[i];

    const correctIndex = randomQuestion.answerOptions.findIndex(
      (option) => option.isCorrect
    );
    const correctAnswerNumber = correctIndex + 1;

    newWorkbook.Sheets["Sheet1"][`B${row}`] = {
      v: randomQuestion.question,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`C${row}`] = {
      v: randomQuestion.answerOptions[0].answer,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`D${row}`] = {
      v: randomQuestion.answerOptions[1].answer,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`E${row}`] = {
      v: randomQuestion.answerOptions[2].answer,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`F${row}`] = {
      v: randomQuestion.answerOptions[3].answer,
      t: "s",
    };
    newWorkbook.Sheets["Sheet1"][`G${row}`] = { v: 30, t: "n" };
    newWorkbook.Sheets["Sheet1"][`H${row}`] = {
      v: correctAnswerNumber,
      t: "s",
    };

    row += 1;
  }

  const newFilePath =
    templateType == "excel"
      ? "./resources/temporary_excel.xlsx"
      : "./resources/temporary_csv.csv";

  if (templateType == "excel") {
    xlsx.writeFile(newWorkbook, newFilePath);

    console.log(`Archivo xlsx guardado correctamente en ${newFilePath}`);
  } else {
    xlsx.writeFile(newWorkbook, newFilePath, { bookType: "csv" });

    console.log(`Archivo CSV guardado correctamente en ${newFilePath}`);
  }

  const nameFile =
    templateType == "excel"
      ? `${numberQuestions}_questions_for_kahoot.xlsx`
      : `${numberQuestions}_questions_for_blooket.csv`;

  res.download(newFilePath, nameFile, (err) => {
    if (err) {
      console.error("Error al enviar el archivo:", err);
      res.status(500).send("Error al descargar el archivo");
    } else {
      fs.unlinkSync(newFilePath);
    }
  });
};

/**
 * Get random questions from the service.
 *
 * This function retrieves a specified number of random questions from the question service.
 * It validates the 'amount' query parameter, ensuring it is a valid number between 1 and 30.
 * If 'amount' is not provided or is invalid, a default value of 10 is used. The maximum number
 * of questions that can be requested is capped at 30 to prevent overloading the service.
 *
 * @async
 * @function getRandomQuestions
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the request.
 * @param {string} req.query.amount - The number of questions requested. This parameter is optional.
 * @param {Object} res - Express response object used to send back the response.
 * @returns {Promise<void>} Sends a JSON response with the requested random questions or an error message.
 *
 * @throws {Error} If an unexpected error occurs, a 500 status code is returned with the error message.
 */
const getRandomQuestions = async (req, res) => {
  try {
    let { amount } = req.query;
    amount = parseInt(amount, 10);

    //validation of amount
    if (isNaN(amount) || amount < 1) {
      amount = 10;
    } else if (amount > 30) {
      amount = 30;
    }

    const randomQuestion = await questionService.getRandomQuestion(amount);

    res.status(200).json({
      message: "Random questions delivered successfully",
      results: randomQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching random questions",
    });
  }
};

module.exports = {
  getRandomQuestions,
  getTemplateQuestions,
  getFormTemplate,
};
