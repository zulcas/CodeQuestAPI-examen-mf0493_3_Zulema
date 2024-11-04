const questionService = require("../services/question.services");
const xlsx = require("xlsx");
const fs = require("fs")
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

const getFormTemplate = async (req, res) => {
  res.render('template-form', {

  })
}

const getTemplateQuestionsKahoot = async (req, res) => {
const { numberQuestions } = req.query;
console.log("🚀 ~ getTemplateQuestions ~ numberQuestions:", numberQuestions);

  let row = 9;

  //lee el template
  const originalFilePath = "./resources/kahoot-template.xlsx";
  const workbook = xlsx.readFile(originalFilePath);

 // creamos el nuevo documento 
 
  const worksheet = workbook.Sheets["Sheet1"];
  const newWorkbook = xlsx.utils.book_new();

   // Agregar la copia de la hoja al nuevo archivo
   xlsx.utils.book_append_sheet(newWorkbook, worksheet, "Sheet1");
  
  for(let i = 0; i < numberQuestions; i++){
  const randomQuestion = await questionService.getRandomQuestion();
  // console.log("🚀 ~ getTemplateQuestions ~ randomQuestion:", randomQuestion);

  

 

  const correctIndex = randomQuestion.answerOptions.findIndex(
    (option) => option.isCorrect
  );
  console.log("🚀 ~ getTemplateQuestions ~ correctIndex:", correctIndex);
  const correctAnswerNumber = correctIndex + 1;

  newWorkbook.Sheets["Sheet1"][`B${row}`] = { v: randomQuestion.question, t: "s" };
  newWorkbook.Sheets["Sheet1"][`C${row}`] = { v: randomQuestion.answerOptions[0].answer, t: "s" };
  newWorkbook.Sheets["Sheet1"][`D${row}`] = { v: randomQuestion.answerOptions[1].answer, t: "s" };
  newWorkbook.Sheets["Sheet1"][`E${row}`] = { v: randomQuestion.answerOptions[2].answer, t: "s" };
  newWorkbook.Sheets["Sheet1"][`F${row}`] = { v: randomQuestion.answerOptions[3].answer, t: "s" };
  newWorkbook.Sheets["Sheet1"][`G${row}`] = { v: 30, t: "n" };
  newWorkbook.Sheets["Sheet1"][`H${row}`] = { v: correctAnswerNumber, t: "s" };

  row += 1;
}

  const newFilePath = './resources/temporary_excel.xlsx' 
  xlsx.writeFile(newWorkbook, newFilePath);

  console.log(`Archivo Excel guardado correctamente en ${newFilePath}`);

  res.download(newFilePath,`${numberQuestions}_questions_for_kahoot.xlsx`, (err) =>{ if (err) { 
    console.error("Error al enviar el archivo:", err); res.status(500).send("Error al descargar el archivo"); 
    } else {  
    fs.unlinkSync(newFilePath); 
  };

});

};

const getTemplateQuestionsBlooket = async (req, res) => {
  const { numberQuestions } = req.query;
  console.log("🚀 ~ getTemplateQuestions ~ numberQuestions:", numberQuestions);
  
    let row = 3;
  
    //lee el template
    const originalFilePath = "./resources/kahoot-template.xlsx";
    const workbook = xlsx.readFile(originalFilePath);
  
   // creamos el nuevo documento 
   
    const worksheet = workbook.Sheets["Sheet1"];
    const newWorkbook = xlsx.utils.book_new();
  
     // Agregar la copia de la hoja al nuevo archivo
     xlsx.utils.book_append_sheet(newWorkbook, worksheet, "Sheet1");
    
    for(let i = 0; i < numberQuestions; i++){
    const randomQuestion = await questionService.getRandomQuestion();
    // console.log("🚀 ~ getTemplateQuestions ~ randomQuestion:", randomQuestion);
  
    
  
   
  
    const correctIndex = randomQuestion.answerOptions.findIndex(
      (option) => option.isCorrect
    );
    console.log("🚀 ~ getTemplateQuestions ~ correctIndex:", correctIndex);
    const correctAnswerNumber = correctIndex + 1;
  
    newWorkbook.Sheets["Sheet1"][`B${row}`] = { v: randomQuestion.question, t: "s" };
    newWorkbook.Sheets["Sheet1"][`C${row}`] = { v: randomQuestion.answerOptions[0].answer, t: "s" };
    newWorkbook.Sheets["Sheet1"][`D${row}`] = { v: randomQuestion.answerOptions[1].answer, t: "s" };
    newWorkbook.Sheets["Sheet1"][`E${row}`] = { v: randomQuestion.answerOptions[2].answer, t: "s" };
    newWorkbook.Sheets["Sheet1"][`F${row}`] = { v: randomQuestion.answerOptions[3].answer, t: "s" };
    newWorkbook.Sheets["Sheet1"][`G${row}`] = { v: 30, t: "n" };
    newWorkbook.Sheets["Sheet1"][`H${row}`] = { v: correctAnswerNumber, t: "s" };
  
    row += 1;
  }
  
    const newFilePath = './resources/temporary_excel.xlsx' 
    xlsx.writeFile(newWorkbook, newFilePath);
  
    console.log(`Archivo Excel guardado correctamente en ${newFilePath}`);
  
    //xlsx.writeFile(newWorkbook, './resources/temporary_csv.csv', { bookType: "csv" });

    res.download(newFilePath,`${numberQuestions}_questions_for_kahoot.xlsx`, (err) =>{ if (err) { 
      console.error("Error al enviar el archivo:", err); res.status(500).send("Error al descargar el archivo"); 
      } else {  
      fs.unlinkSync(newFilePath); 
    };
  
  });
  
  };

module.exports = {
  getRandomQuestions,
  getTemplateQuestionsKahoot,
  getTemplateQuestionsBlooket,
  getFormTemplate
};
/* app.get('/api/v1/question/random', async (req, res) => {



}) */
