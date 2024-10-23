const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

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