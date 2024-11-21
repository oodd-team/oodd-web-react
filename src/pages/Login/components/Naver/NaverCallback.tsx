import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '../../../../components/Loading';
import Modal from '../../../../components/Modal';

import { handleError } from '../../../../apis/util/handleError';

const NaverCallback: React.FC = () => {
	const navigate = useNavigate();
	const apiBaseUrl = import.meta.env.VITE_NEW_API_URL;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	useEffect(() => {
		const handleNaverLogin = async () => {
			try {
				// URL에서 인증 코드 추출
				const code = new URL(window.location.href).searchParams.get('code');
				console.log('인증 코드:', code);

				if (!code) {
					throw new Error('인증 코드가 없습니다.');
				}

				// 리다이렉트 URL 설정 및 서버 URL 생성 해 서버로 리다이렉션
				const redirectUrl = encodeURIComponent('http://localhost:3000/login/complete');
				const serverUrl = `${apiBaseUrl}/auth/login/naver?redirectUrl=${redirectUrl}`;
				window.location.href = serverUrl;
			} catch (error) {
				console.error('네이버 로그인 중 오류 발생:', error);
				const errorMessage = handleError(error);
				setModalMessage(`네이버 ${errorMessage}`);
				setIsModalOpen(true);
			}
		};

		handleNaverLogin();
	}, [navigate, apiBaseUrl]);

	const handleModalClose = () => {
		setIsModalOpen(false);
		navigate('/login'); // 모달 닫힌 후 로그인 페이지로 이동
	};
	return (
		<>
			<Loading />
			{isModalOpen && <Modal content={modalMessage} onClose={handleModalClose} />}
		</>
	);
};

export default NaverCallback;
