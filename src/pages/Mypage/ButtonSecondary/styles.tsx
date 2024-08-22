import styled from 'styled-components';

export const Button = styled.button`
	width: calc(100% - 30px); /* 양옆에 30px씩 공간을 확보 */
	padding: 6px;
	margin: 1.25rem auto;

	border: 1px solid #000;
	border-radius: 10px;
	height: 3.1rem; /* 44px */
	text-align: center;
	cursor: pointer;
	box-sizing: border-box;
`;
