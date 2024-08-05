// src/pages/ProfilePage/styles.tsx
import styled from 'styled-components';

export const AddButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	bottom: 1.25rem;
	right: 1.25rem;
	width: 5rem;
	height: 5rem;
	border: none;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.black};
	box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
	font-size: 1rem;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray3};
	}
`;
