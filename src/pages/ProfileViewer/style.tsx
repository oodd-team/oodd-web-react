import styled from "styled-components";
import backIcon from '../../assets/backIcon.svg';
import moreIcon from '../../assets/moreIcon.svg';

export const ProfileViewerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 844px;
    box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1); // 구분용 10px
    position: relative;
`;

export const HeaderContainer = styled.div`
    width: 100%;
    height: 2.75rem; // 44px
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.9375rem; // 15px
`;

export const BackButton = styled.button`
    width: 1.25rem; // 20px
    height: 1.25rem; // 20px
    margin-left: 0.8125rem; // 13px
    cursor: pointer;
    background-image: url(${backIcon});
    background-repeat: no-repeat;
    background-position: center;
`;

export const UserID = styled.div`
    width: 1.875rem; // 30px
    height: 1.1875rem; // 19px
    left: calc(50% - 1.875rem / 2);
    color: #000000;
`;

export const MoreIcon = styled.button`
    width: 1.5rem; // 24px
    height: 1.5rem; // 24px
    margin-right: 0.9375rem; // 15px
    cursor: pointer;
    background-image: url(${moreIcon});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

export const Vector = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 0;
    border: 0.0625rem solid #C4C4C4; // 1px
`;

export const CounterContainer = styled.div`
    display: flex;
    justify-content: row;
    align-items: center;
    gap: 12.5rem; // 200px
    margin-top: 0.5625rem; // 9px
    margin-bottom: 0.8125rem; // 13px
`;

export const Count = styled.div`
    display: flex;
    flex-direction: column; // 세로 정렬
    align-items: center;
    justify-content: center;
    gap: 0.3125rem; // 5px
`;

export const CountLabel = styled.div`
    font-size: 0.75rem; // 12px
    color: #000;
`;

export const CountNumber = styled.div`
    font-family: 'Pretendard Variable';
    font-size: 1.5rem; // 24px
    font-weight: 600;
    color: #000;
`;

export const PostListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: row;
    overflow-y: auto;
    // 스크롤 바 숨기기
    -ms-overflow-style: none; 
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
        display: none; 
    }
`;
