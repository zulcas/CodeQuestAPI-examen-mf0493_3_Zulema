const { connectDB, disconnectDB }  = require("../config/db");
const { getRandomQuestion } = require("../services/question.services");
const dotenv = require("dotenv");
dotenv.config();

describe('Testing about "/api/v1/question/random" endpoint', () => {
	it('Should connect to the API endpoint for a random question and return a 200 status', async () => {
		const response = await fetch('http://localhost:3000/api/v1/questions/random')
		expect(response.status).toBe(200)
	})
	it('Should return 10 questions when performing a GET request to the API endpoint', async () => {
		const response = await fetch('http://localhost:3000/api/v1/questions/random');
		const data = await response.json();
		const numberOfResults = 10;
		expect(data.results).toHaveLength(numberOfResults);
	});
	it('Should return 30 questions when performing a GET request to the API endpoint and the amount query is 34', async () => {
		const response = await fetch('http://localhost:3000/api/v1/questions/random?amount=34');
		const data = await response.json();
		const numberOfResults = 30;
		expect(data.results).toHaveLength(numberOfResults);
	});
	it('Should return an object response with the same structure that question model', async () => {
		const response = await fetch('http://localhost:3000/api/v1/questions/random');
		const data = await response.json();
		const mockQuestionModel = {
			question: expect.any(String),
			answerOptions: expect.arrayContaining([ 
				expect.objectContaining({
					answer: expect.any(String), 
					isCorrect: expect.any(Boolean) 
				})
			]),
			urlSource: expect.any(String)
		};
		expect(data.results[0]).toMatchObject(mockQuestionModel);
		
	})
})

describe('Testing getRandomQuestion service', () => {
	beforeAll(async () => {
		await connectDB(); // Conecta a la base de datos antes de todos los tests
	});

	afterAll(async () => {
		await disconnectDB(); // Desconecta la base de datos después de todos los tests
	});

	it('Should return 1 when the parameter is 1', async () => {
		const result = await getRandomQuestion(1);
		expect(result).toHaveLength(1);
	});

	it('Should return 1 when the parameter is 20', async () => {
		const result = await getRandomQuestion(20);
		expect(result).toHaveLength(20);
	});

	it('Should return an exception when the parameter is "patata"', async () => {
		await expect(getRandomQuestion("patata")).rejects.toThrow("Amount must be a positive number.");
	  });
})

