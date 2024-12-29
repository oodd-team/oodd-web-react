import { styled } from 'styled-components';

export const BottomSheetMenuLayout = styled.ul`
	margin-bottom: 0.62rem;
	display: flex;
	flex-direction: column;
`;

export const SheetItem = styled.li`
	padding: 0.75rem 1.25rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

export const IconButton = styled.button`
	width: 1.5rem;
	height: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;
