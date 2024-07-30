import styled from "styled-components";

export const SocialLogin = styled.button<{ $bgColor: string; $border?: boolean; }>`
    display: flex;
    align-items: center;
    width: 21.375rem; /* 342px / 16 */
    height: 3.5rem; /* 56px / 16 */
    background-color: ${({ $bgColor }) => $bgColor};
    border-radius: 0.1875rem; /* 3px / 16 */
    border: ${({ $border }) => $border ? '1px solid #000' : 'none'};
    cursor: pointer;
    margin: 0 1.5rem 0.75rem 1.5rem; /* 24px / 16, 12px / 16 */
    box-sizing: border-box;
`;

export const LogoImgWrapper = styled.div<{ $logowidth: string; $logoheight: string;}>`
    display: flex;
    width: ${({ $logowidth }) => $logowidth};
    height: ${({ $logoheight }) => $logoheight};
    margin-left: 1.4rem;
`;

export const LogoImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const TextWrapper = styled.div<{$left: string}>`
    display: flex;
    font-size: 0.875rem; /* 14px / 16 */
    text-align: center; /* 텍스트 중앙 정렬 */
    margin-left: ${({ $left }) => $left};
`;






