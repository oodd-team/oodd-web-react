import styled from "styled-components";

export const PostItemContainer = styled.div`
    width: 100%;
    max-width: 14.2225rem; /* 256px */
    height: 311px; /* 높이 자동 조정 */
    aspect-ratio: 14.2225 / 19.4375; /* 가로 세로 비율 유지 */
    display: flex;
    flex-direction: column;
    position: relative; /* LikesOverlay 위치 조정을 위한 설정 */

    @media (max-width: 530px) {
        max-width: 100vw;
        height: auto; /* 높이 자동 조정 */
        aspect-ratio: auto; /* 작은 화면에서는 비율 유지 없이 자동 조정 */
    }
`; // 좋아요 수, Img 감싸는 큰 틀

export const PostImageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden; /* 이미지 잘리지 않도록 */
`; // Img 감싸는 큰 틀

export const PostImage = styled.img`
    width: 100%;
    height: auto; /* 비율을 유지하려면 height는 auto로 설정 */
    object-fit: cover; /* 이미지가 컨테이너를 덮도록 설정, 잘릴 수 있음 */
`;

export const LikesOverlay = styled.div`
    position: absolute;
    bottom: 0; /* 하단에 배치 */
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    box-sizing: border-box;
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