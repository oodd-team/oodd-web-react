import styled from 'styled-components';

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 512px;
	height: calc(100% - 40px);
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: calc(100% - 160px);
	position: fixed;
	top: 60px;
	left: 0;

	p {
		margin: 5px;
		font-size: 20px;
		color: ${({ theme }) => theme.colors.gray3};
	}
`;

export const Input = styled.input`
	width: 200px;
	padding: 10px;
	margin-top: 10px;
	border: 1px solid ${({ theme }) => theme.colors.gray2};
	border-radius: 5px;
	font-size: 16px;

	&:focus {
		outline: none;
	}
`;
