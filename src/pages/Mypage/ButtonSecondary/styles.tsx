import styled from 'styled-components';

export const Button = styled.button`
	width: calc(100% - 30px); /* 양옆에 30px씩 공간을 확보 */
	padding: 6px;
	margin: 1.25rem auto;
	height: 3.1rem; /* 44px */
	text-align: center;
	color: #FF2389;
	cursor: pointer;
	box-sizing: border-box;
  border: 1px solid;  
	border-radius: 10px;
  border-color: #FF2389;
  padding: 10px;  /* 텍스트가 보더와 겹치지 않게 패딩 설정 */
	
`;
