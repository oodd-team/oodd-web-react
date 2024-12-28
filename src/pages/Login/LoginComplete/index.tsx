import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getUserInfoByJwtApi } from '@apis/auth';
import { handleError } from '@apis/util/handleError';
import { postTermsAgreementApi } from '@apis/user';

import Loading from '@components/Loading';
import Modal from '@components/Modal';

const LoginComplete: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const location = useLocation();
	const navigate = useNavigate();

	const handleModalClose = () => {
		setIsModalOpen(false);
		navigate('/login'); // 모달 닫힌 후 로그인 페이지로 이동
	};

	const hasAgreedToTerms = async (userId: number): Promise<boolean> => {
		try {
			await postTermsAgreementApi(userId);
			return true; // 이용 약관 동의 완료된 사용자
		} catch {
			return false; // 이용 약관 동의 필요한 사용자
		}
	};

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

					const { nickname, name, id } = response.data;
					localStorage.setItem('current_user_id', `${id}`);

					if (nickname && name) {
						if (nickname && name) {
							const isAgreed = await hasAgreedToTerms(id);
							navigate(isAgreed ? '/' : '/signup/terms-agreement'); // 이용 약관이 필요하면 (false) 해당 페이지로 이동
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

	return (
		<>
			<Loading />
			{isModalOpen && <Modal content={modalMessage} onClose={handleModalClose} />}
		</>
	);
};

export default LoginComplete;
