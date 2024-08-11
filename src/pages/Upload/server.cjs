const fs = require('fs');
const qs = require('qs');
const https = require('https');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');

// SSL 인증서 읽어오기
try {
	const privateKey = fs.readFileSync('localhost-key.pem', 'utf8');
	const certificate = fs.readFileSync('localhost.pem', 'utf8');
	var credentials = { key: privateKey, cert: certificate };
	console.log('SSL 인증서 로드 성공');
} catch (error) {
	console.error('SSL 인증서 로드 실패:', error.message);
	process.exit(1); // 인증서 로드 실패 시 서버 시작 중지
}

const app = express();
app.options('*', cors());
app.options('/auth', cors());
app.options('/instagram-import', cors());

app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);
app.use(bodyParser.json());

/* ********** 인스타 *********** */

app.get('/auth', async (req, res) => {
	const client_id = process.env.VITE_INSTAGRAM_CLIENT_ID;
	const client_secret = process.env.VITE_INSTAGRAM_CLIENT_SECRET;
	const redirect_uri = 'https://localhost:3001/auth';
	const { code } = req.query;

	if (!code) {
		// code가 없으면 사용자 인증 URL로 리다이렉트
		try {
			const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=user_profile,user_media&response_type=code`;
			console.log('redirect 시도: ', authUrl);
			return res.redirect(authUrl);
		} catch (error) {
			console.error('Instagram 인증 URL 리디렉트 중 오류 발생:', error.message);
			res.status(500).json({ error: error.message });
		}
	}

	console.log('redirect 성공, code 존재');

	try {
		// 반환된 인증 코드를 사용해 액세스 토큰 교환
		const tokenResponse = await axios.post(
			'https://api.instagram.com/oauth/access_token',
			qs.stringify({
				client_id,
				client_secret,
				grant_type: 'authorization_code',
				redirect_uri,
				code,
			}),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		);
		console.log('code -> 토큰 교환 성공');

		const { access_token } = tokenResponse.data;

		// 클라이언트로 access_token 전송
		return res.redirect(`http://localhost:3000/upload?access_token=${access_token}`);
	} catch (error) {
		console.error('Instagram 미디어를 가져오는 중 오류 발생:', error.message);
		if (error.response) {
			console.error('응답 데이터:', error.response.data);
			console.error('응답 상태:', error.response.status);
		}
		res.status(500).json({ error: 'Failed to fetch Instagram media' });
	}
});

app.get('/instagram-import', async (req, res) => {
	const { access_token } = req.query;

	try {
		// 사용자 미디어 가져오기
		const mediaResponse = await axios.get(
			`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,children&access_token=${access_token}`,
		);

		const mediaData = mediaResponse.data.data;
		const Posts = [];

		// 각 미디어 항목을 순회하며 카루셀(앨범)인 경우 개별 이미지를 추가로 요청
		for (const media of mediaData) {
			const post = {
				caption: media.caption,
				imgs: [],
			};

			if (media.media_type === 'CAROUSEL_ALBUM') {
				const childrenResponse = await axios.get(
					`https://graph.instagram.com/${media.id}/children?fields=media_url&access_token=${access_token}`,
				);
				const childrenData = childrenResponse.data.data;
				post.imgs = childrenData.map((item) => item.media_url);
			} else {
				post.imgs = [media.media_url]; // 단일 미디어인 경우
			}

			Posts.push(post);
		}
		console.log('미디어 로드 성공');

		// 모든 게시물 데이터를 클라이언트로 전송
		res.status(200).json(Posts);
	} catch (error) {
		console.error('Error fetching Instagram media:', error.message);
		if (error.response) {
			console.error('Response data:', error.response.data);
			console.error('Response status:', error.response.status);
		}
		res.status(500).json({ error: 'Failed to fetch Instagram media' });
	}
});

// HTTPS 서버
https.createServer(credentials, app).listen(3001, () => {
	console.log('https://localhost:3001 app listening on port 3001!');
});
