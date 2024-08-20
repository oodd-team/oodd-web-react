// src/pages/ProfilePage/styles.tsx
import styled from 'styled-components';

export const ProfileContainer = styled.div`
	flex-grow: 1;
	height: 100vh;
	width: 100%;
	max-width: 32rem;
	position: relative;
	margin-bottom: 0;
`;

export const AddButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed; /* absolute에서 fixed로 변경 */
	bottom: 6.75rem;
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
	z-index: 1000; /* 다른 요소들 위에 위치하도록 z-index 추가 */

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray3};
	}
`;
