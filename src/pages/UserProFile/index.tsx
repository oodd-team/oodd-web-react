import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
// import axios from 'axios';
import NavBar from "../../components/NavBar";
import UserInfo from "../../components/UserInfo";
import { mockUserData } from "../../components/MocData"; // Mock 데이터 임포트
import Posts from "../../components/Posts";

const GlobalStyle = createGlobalStyle`
    body, html {
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
`;

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

export const UserProFileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: 390px;
    height: 844px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
`;
export const Vector = styled.div`
box-sizing: border-box;

position: absolute;
width: 390px;
height: 0px;
left: 0px;
top: 258px;

border: 1px solid #C4C4C4
`;
const UserProFile: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>(); // URL 파라미터에서 userId 가져오기
    const [userDetails, setUserDetails] = useState<{
        userId: string;
        userBio: string;
        userImg?: string;
        isFriend: boolean;
        isInterested: boolean;
        postsCount: number;
        likesCount: number;

    } | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Mock 데이터 사용
                setUserDetails(mockUserData); // 실제 API 호출로 대체
            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        };

        fetchUserDetails();
    }, [userId]); // userId가 변경될 때마다 호출

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    if (!userDetails) {
        return <div>Loading...</div>; // 데이터 로딩 중 표시
    }

    return (
        <>
            <GlobalStyle />
            <PageWrapper>
                <UserProFileContainer>
                    <NavBar
                        userId={userDetails.userId}
                        onBack={handleGoBack}
                    />
                    <UserInfo 
                        userId={userDetails.userId}
                        userBio={userDetails.userBio}
                        userImg={userDetails.userImg}
                        isFriend={userDetails.isFriend}
                        isInterested={userDetails.isInterested}
                    />
                    <Vector/>
                    <Posts postsCount={userDetails.postsCount} likesCount={userDetails.likesCount}
                    />
                </UserProFileContainer>
            </PageWrapper>
        </>
    );
}

export default UserProFile;







