import styled from 'styled-components';

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
	border-bottom: 1px solid rgb(0, 0, 0, 0.2);
`;

export const Icon = styled.img`
	width: 1.5rem;
	height: 1.5rem;
`;
