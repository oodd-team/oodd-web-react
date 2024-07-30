import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  height: 844px;
  background-color: white;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1); /* 10px / 16 */
`;

export const LogoWrapper = styled.div`
  width: 6.45rem; /* 116px / 16 */
  height: 1.8rem; /* 32px / 16 */
  margin: 10.8rem 0 1.2rem 0;  /* 195px */
`;

export const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 11.75rem; /* 188px / 16 */
  height: 4rem; /* 64px / 16 */
  text-align: center;
  white-space: nowrap;
  margin: 0 0 2.25rem 0; /* 36px / 16 */
`;

export const Service = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: fit-content; /* 버튼 너비가 내용에 맞도록 설정 */
  padding: 0 1rem; /* 16px / 16 */
  margin-top: 0.75rem; /* 12px / 16 */
`;

