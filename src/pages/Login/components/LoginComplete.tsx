import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const LoginComplete: React.FC = () => {
	const { token } = useParams<{ token: string }>(); // URL에서 JWT 토큰 추출

	useEffect(() => {
		if (token) {
			// 로컬 스토리지에 JWT 저장
			localStorage.setItem('new_jwt', token);

			// auth/me API 호출 -> jwt으로 사용자 정보 조회하기
		}
	});

	return <div>로그인 처리 중...</div>;
};

export default LoginComplete;
