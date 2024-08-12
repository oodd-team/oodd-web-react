import styled from "styled-components";

export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    max-width: 32rem;
    height: auto;
    gap: 1.25rem;  /* 20px */
    align-items: center;
    box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1); /* 10px */
`;

export const LogoWrapper = styled.div`
    display: flex;
    width: 6.5rem;
    height: 2rem;  /* 32px */
    margin-top: 10.8rem;  /* 195px */
`;

export const IntroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 12.875rem;  /* 206px */
    height: 4rem;  /* 64px */
`;

export const NickNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 12.125rem;  /* 194px; */
    height: 42px;  /* 2.625rem; */
    margin-top: 4rem;  /* 95px */
`;

export const NickName = styled.input`
    display: flex;
    width: 100%;
    max-width: 196px;
    height: 42px;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 2.6rem;  /* 130% of 2rem */
    border: none;
    outline: none;
    background-color: transparent;
    text-align: center;
    @media (max-width: 213px) {
        font-size: 25px; /* 화면 너비가 213px 이상일 때 폰트 사이즈 줄이기 */
    }
    @media (max-width: 165px) {
        font-size: 20px; /* 화면 너비가 213px 이상일 때 폰트 사이즈 줄이기 */
    }
`;

export const Tap = styled.div`
    display: flex;
    width: 100%;
    max-width: 7.9rem;  /* 153px */
    height: 1.3125rem;  /* 21px */
    font-size: 0.875rem;  /* 14px */
    line-height: 1.3125rem;  /* 21px */
    margin-top: 0.3125rem;  /* 5px */
`;

export const NextButton = styled.button`
    width: 100%;
    max-width: 19rem;  /* 25 */
    height: 3.5rem;  /* 4 */
    background-color: black;
    border-radius: 0.625rem;  /* 10px */
    margin-top: 14.5rem;
    margin-bottom: 1.5rem;  /* 24px */
`;



