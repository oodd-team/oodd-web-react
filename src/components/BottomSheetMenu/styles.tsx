import styled from 'styled-components';

export const BottomSheetMenuLayout = styled.div<{ $marginBottom: string }>`
	margin-bottom: 0.62rem;
	display: flex;
	flex-direction: column;
`;

export const SheetItem = styled.div`
	padding: 0.75rem 1.25rem;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	cursor: pointer;
`;

export const Icon = styled.img`
	width: 1.5rem;
	height: 1.5rem;
`;
