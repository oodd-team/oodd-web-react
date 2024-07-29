import styled from 'styled-components';

export const SheetItemWithDividerLayout = styled.div<{ $marginBottom: string }>`
	margin: 1.5rem 0 ${(props) => (props ? props.$marginBottom : '0')} 0;
	display: flex;
	flex-direction: column;
`;

export const SheetItem = styled.div`
	padding: 0.8rem 1.2rem;
	width: 100%;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
`;

export const Icon = styled.img`
	width: 1.4rem;
	height: 1.4rem;
`;
