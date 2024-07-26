const express = require('express');
const request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const posts = [];

const client_id = 'jh6sQv0jTXqn8ICwc_IU';
const client_secret = 'dYfueD0dyq';

app.use(cors());
app.use(bodyParser.json());

app.get('/clothing', function (req, res) {
	const api_url =
		'https://openapi.naver.com/v1/search/shop.json?query=' +
		encodeURIComponent(req.query.query) +
		'&start=' +
		req.query.start; // JSON 결과
	const options = {
		url: api_url,
		headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
	};
	request.get(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
			res.end(body);
		} else {
			res.status(response.statusCode).end();
			console.log('error = ' + response.statusCode);
		}
	});
});

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

app.listen(3001, function () {
	console.log('http://localhost:3001 app listening on port 3001!');
});
