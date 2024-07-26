import React from "react";
import styled from "styled-components";

export const UserInfoContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

interface UserImgProps {
    $imgUrl?: string;
}

export const UserImg = styled.div<UserImgProps>`
    position: absolute;
    width: 72px;
    height: 72px;
    left: 24px;
    top: 108px;
    background-color: #D9D9D9;
    background-image: url(${props => props.$imgUrl});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
`;

export const UserId = styled.div`
    position: absolute;
    width: 41px;
    height: 22px;
    left: 115px;
    top: 122px;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 120%;
    color: #000000;

`;

export const Bio = styled.div`
    position: absolute;
    width: 250px;
    height: 28px;
    left: 115px;
    top: 152px;

    font-family: 'Pretendard Variable';
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 120%;

    color: #000000;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const FriendsButton = styled.button`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 32px;
    gap: 8px;

    position: absolute;
    width: 164px;
    height: 44px;
    left: 21px;
    top: 204px;
    color: white;
    background: #000000;
    border: 1px solid #000000;
    border-radius: 5px;
`;

export const InterestButton = styled.button`

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 10px 32px;
gap: 8px;

position: absolute;
width: 164px;
height: 44px;
left: 206px;
top: 204px;

background: #FFFFFF;
border: 1px solid #000000;
border-radius: 5px;

`;

interface UserInfoProps {
    userId: string;
    userBio: string;
    userImg?: string;
    isFriend: boolean;
    isInterested: boolean;
}
const UserInfo: React.FC<UserInfoProps> = ({userId, userBio, userImg, isFriend, isInterested}) => {
    // 최대 50자로 제한하기
    const truncatedBio = userBio.length > 50 ? userBio.substring(0, 50) + '...' : userBio;
    
    return (
        <>
        <UserInfoContainer>
            <UserImg $imgUrl={userImg}/>
            <UserId>{userId}</UserId>
            <Bio>{truncatedBio}</Bio>
            {!isFriend ? (
                <FriendsButton style={{ left: '21px', top: '204px' }}>
                    친구 신청
                </FriendsButton>
            ) : (
                <InterestButton style={{ left: '21px', top: '204px' }}>
                    메세지 보내기
                </InterestButton>
            )}
            {!isInterested && !isFriend && (
                <InterestButton style={{ left: '200px', top: '204px' }}>
                    관심 친구
                </InterestButton>
            )}
        </UserInfoContainer>
        </>
    )
}

export default UserInfo;

