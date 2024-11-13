const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
	question: {
		type: String,
		required: true
	},
	codeExamples: {
		type: [String]
	},
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
	explanation: {
		type: String,
		maxlength: 4000
	},
	status: {
		type: String,
		enum: ["approved", "pending"],
		default: "approved"
	},
	urlSource: {
		type: String

	},
	difficulty: {
		type: String,
		enum: ["easy", "medium", "hard"],
		default: "medium"
	}

});

const Questions = model('question', questionSchema);

module.exports = Questions