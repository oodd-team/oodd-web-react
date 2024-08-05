const express = require('express');
const request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const posts = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/posts', (req, res) => {
	try {
		const { caption, photo_urls, hashtags, clothing_infos } = req.body;
		if (
			typeof caption === 'string' &&
			Array.isArray(photo_urls) &&
			Array.isArray(hashtags) &&
			Array.isArray(clothing_infos)
		) {
			const post = { ...req.body, id: posts.length + 1 };
			posts.push(post);
			res.status(201).send(post);
		} else {
			throw new Error('Invalid data format');
		}
	} catch (error) {
		res.status(400).send({ error: 'Invalid request data' });
	}
});

app.get('/instagram-import', (req, res) => {
	try {
		const { insta_id } = req.body;
		if (typeof insta_id === 'string') {
		} else {
			throw new Error('Invalid Instagram ID');
		}
	} catch (error) {
		res.status(400).send({ error: 'Invalid request data' });
	}
});

app.listen(3001, function () {
	console.log('http://localhost:3001 app listening on port 3001!');
});
