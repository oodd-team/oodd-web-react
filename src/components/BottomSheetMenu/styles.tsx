import styled from 'styled-components';

export const BottomSheetMenuLayout = styled.div<{ $marginBottom: string }>`
	margin: 1.8rem 0 ${(props) => (props ? props.$marginBottom : '0')} 0;
	display: flex;
	flex-direction: column;
`;

export const SheetItem = styled.div`
	padding: 1rem 1.25rem;
	width: 100%;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
`;

export const Icon = styled.img`
	width: 1.5rem;
	height: 1.5rem;
`;
