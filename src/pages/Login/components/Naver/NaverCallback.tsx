import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NaverCallback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');
        console.log(code);

        if (code) {

            // 인증 코드를 쿼리스트링으로 백엔드 서버에 전송
            axios.get(`https://api-dev.oodd.today/auth/login/naver?code=${code}`)
                .then(response => {
                    const { success, token, user } = response.data; // 응답 중, 성공 여부와 user 정보 추출

                    if (success) {
                        // user.id를 서버로 보내 해당 유저의 nickname 유무에 따른 리디렉션

                        axios.get(`https://api-dev.oodd.today/users/${user.id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .then(userInfoResponse => {
                            const { nickname } = userInfoResponse.data;
    
                            // 사용자 정보에 따라 리디렉션
                            if (nickname) {
                                navigate('/'); // 홈 페이지로 이동
                            } else {
                                // 회원가입 페이지로 user.id를 쿼리 스트링으로 포함하여 이동
                                navigate(`/signup?id=${user.id}&token=${encodeURIComponent(token)}`);
                            }
                        })
                        .catch(userInfoError => {
                            console.error('User 조회 요청 실패:', userInfoError);
                        });
                    } else {
                        console.error('로그인 실패:', response.data);
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

    return (
        <div>
            <p>로그인 중입니다...</p>
        </div>
    );
};

export default NaverCallback;


