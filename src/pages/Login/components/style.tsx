import styled from "styled-components";

export const SocialLogin = styled.button<{ $bgColor: string; $border?: boolean; }>`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 21.375rem; /* 342px / 16 */
    height: 3.5rem; /* 56px / 16 */
    background-color: ${({ $bgColor }) => $bgColor};
    border-radius: 0.1875rem; /* 3px / 16 */
    border: ${({ $border }) => $border ? '1px solid #000' : 'none'};
    cursor: pointer;
    margin-bottom: 0.75rem;
    box-sizing: border-box;
`;

export const LogoImgWrapper = styled.div<{ $logowidth: string; $logoheight: string;}>`
    display: flex;
    align-items: center;
    width: ${({ $logowidth }) => $logowidth};
    height: ${({ $logoheight }) => $logoheight};
    margin-left: 1rem;
`;

export const LogoImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

export const TextWrapper = styled.div<{ $left?: string;}>`
    display: flex;
    width: 12.5rem;
    padding-left: ${({ $left }) => $left || '1.2rem'};
    align-items: center;
    margin: 0 auto;
`;



