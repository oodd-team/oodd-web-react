import styled from 'styled-components';

export const InputLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	textarea {
		display: block;
		width: 100%;
		height: 100px;
		border-radius: 8px;
		border: 0.0625rem solid #ededed;
		margin-bottom: 100px;
		margin-top: -10px;
		outline: none;
		padding: 0.8125rem 0.9375rem;
		font-family: 'Pretendard Variable';
		font-size: 1rem;
		font-style: normal;
		font-weight: 300;
		line-height: 150%;
		color: #1d1d1d;
		background-color: #f8f8f8;
		resize: none;
	}
`;
