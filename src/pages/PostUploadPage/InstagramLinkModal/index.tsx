import React, { useState } from 'react';
import axios from 'axios';
import { ModalContainer, Content, Input } from './styles';
import { Header, PrevButton, Text } from '../Header';
import { Footer, Button } from '../Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface InstagramLinkModalProps {
	onClose: () => void;
}

const InstagramLinkModal: React.FC<InstagramLinkModalProps> = ({ onClose }) => {
	const [instagramID, setInstagramID] = useState('');
	const [selectedImages, setSelectedImages] = useState([]);

	const handleConnect = () => {
		/*
		app.post('/auth/instagram', async (req, res) => {
			const { code } = req.body;
			const client_id = 'YOUR_CLIENT_ID';
			const client_secret = 'YOUR_CLIENT_SECRET';
			const redirect_uri = 'http://localhost:3000/auth';

			try {
				const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', {
					client_id,
					client_secret,
					grant_type: 'authorization_code',
					redirect_uri,
					code,
				});

				const { access_token, user_id } = tokenResponse.data;

				const mediaResponse = await axios.get(
					`https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${access_token}`,
				);

				res.json(mediaResponse.data);
			} catch (error) {
				res.status(500).json({ error: 'Failed to fetch Instagram media' });
			}
		});
		*/
		//인스타그램 계정 연동 로직 추가
		/*
		//1. 액세스 토큰 및 권한 받기
		- 인증받기
		//인증 창 URL 샘플
		https://api.instagram.com/oauth/authorize
			?client_id=483837537679389
			&redirect_uri=https://localhost:3000/auth
			&scope=user_profile,user_media
			&response_type=code
		//성공적인 인증 리디렉션 샘플
		https://localhost:3000/auth/?code=AQBx-hBsH3...#_
		- 코드를 토큰으로 교환 
		//요청 샘플
		curl -X POST \
		https://api.instagram.com/oauth/access_token \
			-F client_id=483837537679389 \
			-F client_secret=eb8c7... \
			-F grant_type=authorization_code \
			-F redirect_uri=https://localhost:3000/auth \
			-F code=AQBx-hBsH3...
		//성공적인 응답 샘플
		{
			"access_token": "IGQVJ...",
			"user_id": 17841405793187218
		}
		*/
		/*
		//2. 사용자 노드 쿼리 
		//요청 샘플
		curl -X GET \ 'https://graph.instagram.com/me/media?fields=id,caption&access_token=IGQVJ...'
		//응답 샘플
		{ "data": [ { "id": "17895695668004550", "caption": "" }, { "id": "17899305451014820", "caption": "" }, { "id": "17896450804038745", "caption": "" }, { "id": "17881042411086627", "caption": "" } ], "paging": { "cursors": { "after": "MTAxN...", "before": "NDMyN..." }, "next": "https://graph.faceb..." } }
		*/
		/*
		//3. 미디어 노드 쿼리
		// 요청 샘플
		curl -X GET \ 'https://graph.instagram.com/17895695668004550?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJ...'
		// 응답 샘플
		{ "id": "17895695668004550", "media_type": "IMAGE", "media_url": "https://fb-s-b-a.akamaihd.net/...", "username": "jayposiris" "timestamp": "2017-08-31T18:10:00+0000" }
		*/
	};

	return (
		<ModalContainer>
			<Header>
				<PrevButton onClick={onClose}>
					<FontAwesomeIcon icon={faXmark} />
				</PrevButton>
				<Text>인스타 계정 연동</Text>
			</Header>
			<Content>
				<p>인스타 계정 연동을 위해</p>
				<p>인스타그램 ID를 작성해주세요</p>
				<Input
					type="text"
					value={instagramID}
					onChange={(e) => setInstagramID(e.target.value)}
					placeholder="인스타그램 ID"
				/>
			</Content>
			<Footer>
				<Button onClick={handleConnect}>연동하기</Button>
			</Footer>
		</ModalContainer>
	);
};

export default InstagramLinkModal;
