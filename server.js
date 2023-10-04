const PORT = 8000

const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY = process.env.OPENAI_API_KEY

app.post('/completions', async (req, res) => {
	const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			prompt: req.body.prompt,
			messages: [
				{
					role: 'system',
					content: 'You are an assistant that speaks like Lionel Messi.',
				},
				{ role: 'user', content: req.body.message },
			],
			max_tokens: 100,
		}),
	}
	try {
		const response = await fetch(
			'https://api.openai.com/v1/chat/completions',
			options
		)
		const data = await response.json()
		res.send(data)
	} catch (e) {
		console.error(e)
	}
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
