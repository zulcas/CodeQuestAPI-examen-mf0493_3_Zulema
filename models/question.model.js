const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
   /* title: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        enum:[]
    },*/
    question: {
        type: String,
        required: true
    },
    codeExamples: {
        type: [String]
    },
    answerOptions: [
        {
          answers: {
            type: String,
            required: true // Texto de la opción de respuesta 
          },
          isCorrect: {
            type: Boolean,
            required: true // Indicación de si esta opción de respuesta es correcta 
          }
        },
        
      ], 
      //required: true,
      //return: Array.length(-4) //limitar la cantidad de respuestas
    // correctAnswer: {
    //     type: [String],
    //     required: true
    // },
    // incorrectAnswer: {
    //     type: [String],
    //     required: true
    // }

});

const Questions = model('question', questionSchema);

module.exports = Questions