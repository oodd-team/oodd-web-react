import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import request from "../../../../apis/core";
import { UserInfoDto } from "../../../ProfileViewer/ResponseDto/UserInfoDto";

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
                    const statusCode = response.status; // 200 OK
                    console.log(JSON.stringify(response.data))

                    if (statusCode === 200) { // 추후 Postman에서 api 호출해 보고 응답을 보고 적어야 함
                        // userid를 서버로 보내 해당 유저의 nickname 유무에 따른 리디렉션
                        const token = response.data.accessToken; 
                    
                        localStorage.setItem('id', response.data.id);
                        localStorage.removeItem('jwt_token');
                        localStorage.setItem('jwt_token', token);
                        const userid = localStorage.getItem('id');
                        
                        request.get<UserInfoDto>(`/users/${userid}`)
                        .then(response => {
                            console.log(response);
                            if(response.nickname){
                                navigate('/');
                            }
                            else{
                                navigate(`/signup`)
                            }
                        })
                        .catch(error => {
                            // API 요청 실패 시 처리
                            console.error('API 요청 실패:', error);
                            alert('사용자 정보를 불러오지 못했습니다.');
                            navigate('/login'); // 실패 시 로그인 페이지로 리디렉션
                        });
                    } else {
                        console.error('로그인 실패:', response.data);
                        alert('네이버 계정의 정보를 불러오지 못했습니다.');
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

    return (
        <div>
            <p>로그인 중입니다...</p>
        </div>
    );
};

export default NaverCallback;


