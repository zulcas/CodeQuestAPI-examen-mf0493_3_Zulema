const questionSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    language: {
        type: String,
        require: true,
        enum:[]
    },
    question: {
        type: String,
        require: true
    },
    codeExamples: {
        type: [String]
    },
    // answer: {
    //     type: [String],
    //     isCorrect: {
    //         type: Boolean,
    //         required: true
    //     }
    // },
    answerOptions: [
        {
          answer: {
            type: String,
            required: true // Texto de la opción de respuesta 
          },
          isCorrect: {
            type: Boolean,
            required: true // Indicación de si esta opción de respuesta es correcta 
          }
        },
        
      ], 
      required: true,
      return: Array.length(-4) //limitar la cantidad de respuestas
    // correctAnswer: {
    //     type: [String],
    //     require: true
    // },
    // incorrectAnswer: {
    //     type: [String],
    //     require: true
    // }

});

const Question = model('question', questionSchema);

module.exports = Question