import styled from 'styled-components';

export const SheetItemWithDividerLayout = styled.div`
	margin: 26px 0px ${(props) => (props ? props.$marginBottom : '0px')} 0px;
	display: flex;
	flex-direction: column;
`;

export const SheetItem = styled.div`
	margin: 13px 21px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
`;
