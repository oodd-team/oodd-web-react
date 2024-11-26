import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '../../../components/Loading';
import Modal from '../../../components/Modal';

import { getUserInfoByJwtApi } from '../../../apis/auth';
import { handleError } from '../../../apis/util/handleError';
import { postTermsAgreementApi } from '../../../apis/user';

const LoginComplete: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	useEffect(() => {
		// URLSearchParams를 사용해 쿼리 문자열에서 token 추출
		const queryParams = new URLSearchParams(location.search);
		const token = queryParams.get('token');

		if (token) {
			localStorage.setItem('new_jwt_token', token);
			console.log('Extracted Token:', token);

			// JWT로 사용자 정보 조회하는 함수
			const getUserInfoByJwt = async () => {
				try {
					const response = await getUserInfoByJwtApi();
					console.log(response);

					const { nickname, name, userId } = response.data;
					localStorage.setItem('my_id', `${userId}`);

					if (nickname && name) {
						if (nickname && name) {
							const isAgreed = await checkTermsAgreement(userId);
							navigate(isAgreed ? '/' : '/terms-agreement');
						}
					} else {
						navigate('/signup');
					}
				} catch (error) {
					console.error('사용자 정보 조회 실패:', error);
					const errorMessage = handleError(error, 'user');
					setModalMessage(errorMessage);
					setIsModalOpen(true);
				}
			};
			getUserInfoByJwt();
		}
	}, [location]);

	const checkTermsAgreement = async (userId: string): Promise<boolean> => {
		try {
			await postTermsAgreementApi(userId);
			return true; // 동의 완료
		} catch {
			return false; // 동의 필요
		}
	};

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

export default LoginComplete;
