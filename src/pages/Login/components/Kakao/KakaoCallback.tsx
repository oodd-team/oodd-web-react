import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GetUserInfoResult } from '../../../ProfileViewer/ResponseDto/GetUserInfoResult';
import request from '../../../../apis/core';
import Loading from '../../../../components/Loading';
//import { getKakaoLoginApi } from '../../../../apis/Auth';

const KakaoCallback: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get('code'); // URL에서 인증 코드 추출
		console.log(code); // 인증 코드 출력

		if (code) {
			// const getKakaoLogin = async () => {
			// 	try{
			// 		const response = await getKakaoLoginApi(code);
			// 		const statusCode = response.status;
			// 		if (statusCode === 200) {
			// 			const token = response.data.accessToken;
			// 			localStorage.removeItem('jwt_token');
			// 			localStorage.setItem('NEW_JWT_TOKEN', token);
			// 	}
			// }
			// 	catch (error) {

			// 	}
			// }
			// 인증 코드를 쿼리스트링으로 백엔드 서버에 전송
			axios
				.get(`https://api-dev.oodd.today/auth/login/kakao?code=${code}`)
				.then((response) => {
					const statusCode = response.status; // 200 OK
					console.log(JSON.stringify(response.data));
					if (statusCode === 200) {
						// 추후 Postman에서 api 호출해 보고 응답을 보고 적어야 함
						// userid를 서버로 보내 해당 유저의 nickname 유무에 따른 리디렉션
						const token = response.data.accessToken;

						localStorage.setItem('id', response.data.id); // 응답으로 id가 오지 않기 때문에 여기서 설정해야 함 수정 필요?
						localStorage.removeItem('jwt_token');
						localStorage.setItem('jwt_token', token);
						const userid = localStorage.getItem('id');

						request
							.get<GetUserInfoResult>(`/users/${userid}`)
							.then((response) => {
								console.log(response);
								if (response.result.nickname) {
									navigate('/');
								} else {
									navigate(`/signup`);
								}
							})
							.catch((error) => {
								// API 요청 실패 시 처리
								console.error('API 요청 실패:', error);
								alert('사용자 정보를 불러오지 못했습니다.');
								navigate('/login'); // 실패 시 로그인 페이지로 리디렉션
							});
					} else {
						console.error('로그인 실패:', response.data);
						alert('카카오 계정의 정보를 불러오지 못했습니다.');
						navigate('/login');
						// 로그인 실패 시 처리
					}
				})
				.catch((error) => {
					console.error('서버 요청 실패:', error);
				});
		} else {
			// 인증 코드가 없는 경우 처리
			console.error('인증 코드가 없습니다.');
		}
	}, [navigate]);
	return <Loading />;
};

export default KakaoCallback;
