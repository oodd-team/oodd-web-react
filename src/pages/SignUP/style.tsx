import styled from "styled-components";

export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 32rem; /* 최대 너비 512px */
    height: auto;
    margin: 0 auto; /* 중앙 정렬 */
    box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1); /* 경계 구분용*/
`;

export const LogoWrapper = styled.div`
    width: 100%;
    max-width: 7.25rem; /* 116px / 16 */
    height: 4rem; /* 32px / 16 */
    margin-top: 10.8rem  /* 195px */
`;

export const IntroWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 13rem;
    width: 100%;
    height: 4rem; /* 64px / 16 */
    text-align: center;
    margin-bottom: 2.25rem; /* 36px / 16 */
`;

export const NickNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 12.125rem;  /* 194px; */
    height: 2.625rem; 
    margin-top: 5.9375rem;  /* 95px */
`;

export const NickName = styled.input`
    display: flex;
    width: 100%;
    max-width: 12.25rem;
    height: 2.625rem;
    font-family: 'Gmarket Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 2rem;
    line-height: 2.6rem;  /* 130% of 2rem */
    border: none;
    outline: none;
    background-color: transparent;
    text-align: center;
    @media (max-width: 13.3125rem) {
        font-size: 1.5625rem; /* 화면 너비가 213px 이상일 때 폰트 사이즈 줄이기 */
    }
    @media (max-width: 10.3125rem) {
        font-size: 1.25rem; /* 화면 너비가 213px 이상일 때 폰트 사이즈 줄이기 */
    }
`;

export const Tap = styled.div`
    display: flex;
    width: 100%;
    max-width: 9.5625rem;  /* 153px */
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
    margin-top: 16.25rem;
    margin-bottom: 1.5rem;  /* 24px */
`;



