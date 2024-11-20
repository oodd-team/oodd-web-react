import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { getNaverLoginApi } from '../../../../apis/auth';

const NaverCallback: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get('code'); // URL에서 인증 코드 추출
		console.log(code); // 인증 코드 출력 여기까지는 잘... 되는 듯? ㅜㅜ 근데... 흠.

		if (code) {
			const redirectUrl = 'http://localhost:3000/login/complete';

			getNaverLoginApi(redirectUrl)
				.then((response) => {
					if (response.code === 'SUCCESS') {
						console.log('로그인 성공:', response);
					} else {
						console.error('로그인 실패:', response.data);
						alert('네이버 계정의 정보를 불러오지 못했습니다.');
						navigate('/login'); // 로그인 실패 시 처리
					}
				})
				.catch((error) => {
					console.error('서버 요청 실패:', error);
					alert('서버 요청에 실패했습니다.');
					navigate('/login'); // 실패 시 로그인 페이지로 리디렉션
				});
		} else {
			// 인증 코드가 없는 경우 처리
			console.error('인증 코드가 없습니다.');
			alert('인증 코드가 누락되었습니다.');
			navigate('/login'); // 인증 코드가 없으면 로그인 페이지로 이동
		}
	}, [navigate]);

	return <Loading />;
};

export default NaverCallback;
