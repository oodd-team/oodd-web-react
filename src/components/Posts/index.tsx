import React from "react";
import styled from "styled-components";

// 게시물 수와 좋아요 수를 담을 컨테이너
const PostsContainer = styled.div`
    position: relative;
    top: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* 상단 정렬 */
    padding: 0 20px;
`;

const OOTDText = styled.div`
    position: absolute;
    width: 33px;
    height: 14px;
    left: 88px;
    top: 0; /* 상위 요소가 top: 273px이므로, top을 0으로 설정 */
    font-family: 'Pretendard Variable', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #434343;
`;

const PostsCount = styled.div`
    position: absolute;
    width: 12px;
    height: 22px;
    left: 99px;
    top: 18px; /* OOTDText 아래에 위치하도록 조정 */
    font-family: 'Gmarket Sans', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 120%;
    text-align: center;
    color: #000000;
`;

const LikesCount = styled.div`
    position: absolute;
    right: 20px; /* 오른쪽 정렬, padding 값과 맞춤 */
    top: 0; /* 상단 위치 조정 */
    font-family: 'Gmarket Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #434343;
`;

interface PostsProps {
    postsCount: number;
    likesCount: number;
}

const Posts: React.FC<PostsProps> = ({ postsCount, likesCount }) => {
    return (
        <PostsContainer>
            <OOTDText>OOTD</OOTDText>
            <PostsCount>{postsCount}</PostsCount>
            <LikesCount>좋아요 {likesCount}</LikesCount>
        </PostsContainer>
    );
};

export default Posts;



