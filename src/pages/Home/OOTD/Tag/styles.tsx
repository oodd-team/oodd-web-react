import styled from 'styled-components';

export const TagWrapper = styled.div<{ isSelected: boolean }>`
	display: inline-flex;
	padding: 0.25rem 1rem 0.25rem 0.25rem;
	align-items: center;
	gap: 0.5rem;
	background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.black : 'transperent')};
	border-radius: 1.375rem;
	border: 0.0625rem solid ${({ theme }) => theme.colors.gray3};
	width: auto;
	cursor: pointer;
`;

export const TagImgWrapper = styled.div`
	width: 1.75rem;
	height: 1.75rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
