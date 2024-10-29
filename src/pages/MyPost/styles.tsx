import styled from 'styled-components';
import theme from '../../styles/theme';

export const TabContainer = styled.div`
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid ${theme.colors.gray3};
`;

export const TabButton = styled.button<{ active: boolean }>`
	flex: 1;
	padding: 10px;
	background-color: ${({ active }) => (active ? theme.colors.white : theme.colors.gray1)};
	color: ${({ active }) => (active ? theme.colors.black : theme.colors.gray4)};
	border: none;
	cursor: pointer;
	font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

export const TabContent = styled.div`
	padding: 20px;
	background-color: ${theme.colors.white};
`;

export const ModalContainer = styled.div`
	background: white;
	border-radius: 10px 10px 0 0;
	max-width: 512px;
	position: flex;
	height: 377px;
	flex-shrink: 0;
`;
