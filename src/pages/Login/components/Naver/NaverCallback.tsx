import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../../../components/Loading';

import { handleError } from '../../../../apis/util/handleError';

const NaverCallback: React.FC = () => {
	const navigate = useNavigate();
	const apiBaseUrl = import.meta.env.VITE_NEW_API_URL;

	useEffect(() => {
		const handleKakaoLogin = async () => {
			try {
				// URL에서 인증 코드 추출
				const code = new URL(window.location.href).searchParams.get('code');
				console.log('인증 코드:', code);

				if (!code) {
					throw new Error('인증 코드가 없습니다.');
				}

				// 리다이렉트 URL 설정 및 서버 URL 생성
				const redirectUrl = encodeURIComponent('http://localhost:3000/login/complete');
				const serverUrl = `${apiBaseUrl}/auth/login/naver?redirectUrl=${redirectUrl}`;

				// 서버로 리다이렉션
				window.location.href = serverUrl;
			} catch (error) {
				// 에러 처리
				console.error('네이버 로그인 중 오류 발생:', error);
				const errorMessage = handleError(error);
				alert(errorMessage);
				navigate('/login'); // 에러 발생 시 로그인 페이지로 이동
			}
		};

		handleKakaoLogin();
	}, [navigate, apiBaseUrl]);

	return <Loading />;
};

export default NaverCallback;
