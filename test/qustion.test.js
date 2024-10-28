/* const fetch = require('node_fetch'); */
/* const app = require('../routes/index'); */
const mongoose = require('mongoose');

const { getRandomQuestions } = require('../controllers/index.controllers');


describe('/api/v1/question/random', () => {

	it('Devuelve una pregunta aleatoria', async () => {
		const response = await fetch('http://localhost:3000/api/v1/question/random')

		const data = await response.json();

		expect(response.status).toBe(200)

		/* expect(data.results.answerOptions[0].answers).toBe(String) */

	})
})



