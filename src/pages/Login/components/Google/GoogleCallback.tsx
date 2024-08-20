import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');
        console.log(code);

        if (code) {

            // 인증 코드를 쿼리스트링으로 백엔드 서버에 전송
            axios.get(`https://api-dev.oodd.today/auth/login/google?code=${code}`)
                .then(response => {
                    const statusCode = response.status;
                    console.log(JSON.stringify(response.data));
                    const token = response.data.accessToken; // 응답 중, 성공 여부와 user 정보 추출
                    localStorage.setItem('id','22'); // 로그인 성공을 하면... isSuccess랑 토큰이 오니까... 내 정보 조회를 먼저 해서 id를 가져 와서 로컬에 저장하기~
                    localStorage.removeItem('jwt_token');
                    localStorage.setItem('jwt_token', token);
                    console.log(token);
                    console.log(localStorage.getItem('jwt_token'))
                    if (statusCode === 200) { // Postman에서 api 호출해 보고 응답을 보고 적어야 함
                        // user.id를 서버로 보내 해당 유저의 nickname 유무에 따른 리디렉션
                        navigate('/');
                    } else {
                        console.error('로그인 실패:', response.data);
                        alert('구글 계정의 정보를 불러오지 못했습니다.');
                        navigate('/login');
                        // 로그인 실패 시 처리 (예: 오류 페이지로 리디렉션)
                    }
                })
                .catch(error => {
                    console.error('서버 요청 실패:', error);
                });
            } else {
                // 인증 코드가 없는 경우 처리
                console.error('인증 코드가 없습니다.');
            }
        }, [navigate]);
        return(
        <div>
            <p>로그인 중입니다...</p>
        </div>
        );
};

export default GoogleCallback;




