const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const { getRandomQuestionsDB } = require('../services/question.services');
const { shuffleArray } = require('../utils/utils')


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

	const randomQuestions = await getRandomQuestionsDB(Number(numberQuestions));
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

const getDailyQuestion = async (req, res) => {
  // Obtener la pregunta correspondiente al día
  const questions = await getRandomQuestionsDB(1, {codeExamples:[]});
  const questionsWithShuffledAnswers = questions.map(question => {
    return {
        ...question,
        answerOptions: shuffleArray(question.answerOptions)
    };
	});
  // Renderizar la página con la pregunta y las opciones
  res.render('home',  {questionsWithShuffledAnswers} );
};


module.exports = {
	getTemplateQuestions,
	getFormTemplate,
	getDailyQuestion
};
