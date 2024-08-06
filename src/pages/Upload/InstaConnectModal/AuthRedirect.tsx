import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthRedirect: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const fetchInstagramMedia = async (code: string) => {
			try {
				const response = await axios.post('http://localhost:3000/instagram-import', { code });
				const images = response.data.data.map((item: any) => item.media_url);
				navigate('/upload', { state: { images } });
			} catch (error) {
				console.error('Failed to fetch Instagram media:', error);
			}
		};

		const query = new URLSearchParams(window.location.search);
		const code = query.get('code');
		if (code) {
			fetchInstagramMedia(code);
		}
	}, [navigate]);

	return <div>Loading...</div>;
};

export default AuthRedirect;
