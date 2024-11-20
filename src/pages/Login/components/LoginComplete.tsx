import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '../../../components/Loading';

import { getUserInfoByJwtApi } from '../../../apis/auth';
import { handleError } from '../../../apis/util/handleError';

const LoginComplete: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		// URLSearchParams를 사용해 쿼리 문자열에서 token 추출
		const queryParams = new URLSearchParams(location.search);
		const token = queryParams.get('token');

		if (token) {
			// 로컬 스토리지에 NEW_JWT 저장
			localStorage.setItem('new_jwt_token', token);
			console.log('Extracted Token:', token);
			// auth/me API 호출 -> JWT로 사용자 정보 조회하기

			const getUserInfoByJwt = async () => {
				try {
					const response = await getUserInfoByJwtApi();
					console.log(response);

					if (!response.data.nickname) {
						navigate('/signup');
					} else {
						navigate('/');
					}
				} catch (error) {
					console.error('사용자 정보 조회 실패:', error);
					const errorMessage = handleError(error, 'user');
					alert(errorMessage);
				}
			};
			getUserInfoByJwt();
		}
	}, [location]);

	return <Loading />;
};

export default LoginComplete;
