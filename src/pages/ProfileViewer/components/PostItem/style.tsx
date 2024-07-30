import styled from "styled-components";

export const PostItemContainer = styled.div`
    width: 14.2225rem; // 256px
    height: 19.4375rem; // 311px
    display: flex;
    flex-direction: column;
`; // 좋아요 수, Img 감싸는 큰 틀

export const PostImageContainer = styled.div`
    width: 100%;
    height: 100%; // 311px
    border: 0.0625rem solid black; // 경계 구분용 1px
    position: relative;
`; // Img 감싸는 큰 틀

export const PostImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const LikesOverlay = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
`;

export const HeartIcon = styled.img`
    margin: 14.25rem 0 0.75rem 8.75rem; // 228px 0px 12px 140px
    width: 1.5625rem; // 25px
    height: 1.5625rem; // 25px
`;

export const LikesCount = styled.div`
    color: white;
    font-size: 0.75rem; // 12px
    margin: 0 1.3125rem 0.625rem 0.375rem; // 0 21px 10px 6px
`;

export const PinSvg = styled.img`
    display: flex;
    position: absolute;
    top: 0.7rem;
    left: 1.1rem;
    justify-content: center;
    align-items: center;
`;