const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

// "base de datos"
const quizData = [
    {
      question: 'A set of intructions that tells the computer how to behave, what to do and derive at a solution to a particular problem is:',
      options: ['Algorithm', 'Pseudocode', 'Programming', 'Program'],
      answer: 'Program',
    },
    {
      question: 'A set of logically sequenced instructions that allows to find the solution to a problem is:',
      options: ['Algorithm', 'Pseudocode', 'Programming', 'Program'],
      answer: 'Algorithm',
    },
    {
      question: 'The six stages of program development in logical order are:',
      options: ['Define, Analyze, Write, Test, Document, Debug', 'Define, Analyze, Develop, Write, Test and Debug, Document', 'Define, Write, Develop, Analyze, Test, Document', 'Define, Develop, Write, Test, Document, Debug'],
      answer: 'Define, Analyze, Develop, Write, Test and Debug, Document',
    },
    {
      question: 'The programming language that is used to show pupils the concept and structure of programming is called:',
      options: ['Basic', 'Cobol', 'Pascal', 'Java'],
      answer: 'Pascal',
    },
    {
      question: 'Java is an example of which generation programming language',
      options: [
        '4GLs',
        '3rd',
        '2nd',
        '1st',
      ],
      answer: '3rd',
    },
    {
      question: 'Which of the following generations of programming language executed code faster:',
      options: ['4GLs', '3rd', '2nd', '1st'],
      answer: '1st',
    },
    {
      question: 'Algorithms must be all of the following except:',
      options: [
        'Logical',
        'Ambiguous',
        'Concise',
        'Precise',
      ],
      answer: 'Ambiguous',
    },
    {
      question: 'Which language had codes such as MOV, ADD, SUB',
      options: ['Java', 'Binary', 'Pascal', 'Assembly'],
      answer: 'Assembly',
    },
    {
      question: 'Which of the following had executes programming codes line by line, rather than the whole program',
      options: [
        'Compiler',
        'Interprete',
        'Executer',
        'Translator',
      ],
      answer: 'Interpreter',
    },
    {
      question: 'All the following are examples of third programming language except:',
      options: ['Pascal', 'C#', 'Basic', 'Fortran'],
      answer: 'Fortran',
    },
  ];

  const question = {
    "question": "What does CSS stand for?",
    "answerOptions": [
      {
        "answer": "Cascading Style Sheets",
        "isCorrect": true
      },
      {
        "answer": "Computer Style System",
        "isCorrect": false
      },
      {
        "answer": "Creative Styling Solution",
        "isCorrect": false
      },
      {
        "answer": "Coded Style Syntax",
        "isCorrect": false
      }
    ]
  }

// Función para obtener el índice del día, basado en la fecha actual
function getDayIndex(totalQuestions) {
    const today = new Date();
    const fechaStr = today.getFullYear().toString() + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0');
    const numeroDia = parseInt(fechaStr);
    return numeroDia % totalQuestions;  // Asegurarse de que el índice esté dentro del rango de preguntas
  }

app.get('/daily-question', (req, res) => {
    const totalQuestions = quizData.length;
      const dayIndex = getDayIndex(totalQuestions);
    
      // Obtener la pregunta correspondiente al día
    
      // Renderizar la página con la pregunta y las opciones
      res.render('home', { question });
    })


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


app.listen(3000);