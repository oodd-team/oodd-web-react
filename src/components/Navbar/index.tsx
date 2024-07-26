import React from "react";
import styled from "styled-components";
import backIcon from '../../assets/backIcon.svg';
import moreIcon from '../../assets/moreIcon.svg';

const HeaderWrapper = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

export const BackButton = styled.button`
    position: absolute;
    width: 8px;
    height: 16px;
    left: 28px;
    top: 68px;
    border: none;
    background: none;
    cursor: pointer;
    background-image: url(${backIcon});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;
export const UserID = styled.div`
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 120%; /* 19.2px */
    position: absolute;
    width: 30px;
    height: 19px;
    left: calc(50% - 30px/2);
    top: 67px;
    color: #000000;
`;
export const MoreIcon = styled.button`
    position: absolute;
    width: 24px;
    height: 24px;
    left: 342px;
    top: 64px;
    cursor: pointer;
    background-image: url(${moreIcon});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;
interface HeaderProps {
    userId: string;
    onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ userId, onBack }) => {
    return (
        <HeaderWrapper>
            <BackButton onClick={onBack} />
            <UserID>{userId}</UserID>
            <MoreIcon />
        </HeaderWrapper>
    );
};

export default Header;
