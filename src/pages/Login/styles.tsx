import styled from 'styled-components';

export const LoginContainer = styled.div`
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


export const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 11.75rem;
  width: 100%;
  height: 4rem; /* 64px / 16 */
  text-align: center;
  margin-bottom: 2.25rem; /* 36px / 16 */
`;

export const Service = styled.button`
  display: flex;
  border: none;
  width: fit-content; /* 버튼 너비가 내용에 맞도록 설정 */
  padding: 0 1rem; /* 16px / 16 */
  margin-bottom: 15.8rem;
`;

