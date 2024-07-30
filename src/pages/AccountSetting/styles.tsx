import styled from 'styled-components';

export const ProfileEditContainer = styled.div`
	max-width: 32rem; /* 512px */
	margin: 0 auto;
	padding: 1.25rem; /* 20px */
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ProfilePicWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.25rem; /* 20px */
`;

export const ProfilePic = styled.div`
	width: 7.25rem; /* 116px */
	height: 7.25rem; /* 116px */
	flex-shrink: 0;
	border-radius: 50%;
	overflow: hidden;
	margin-top: 2.125rem; /* 34px */
	margin-bottom: 1.375rem; /* 22px */

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const Label = styled.div`
	font-size: 0.875rem; /* 14px */
	color: #333;
	margin-top: 3.75rem; /* 60px */
	text-align: center;
`;

export const Row = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-bottom: 0.875rem; /* 14px */

	${Label} {
		width: auto;
		margin: 0;
	}
`;

export const FileInput = styled.input`
	display: none;
`;

export const List = styled.ul`
	width: 100%;
	padding: 0;
	margin-top: 12.5rem; /* 200px */
	list-style: none;
	border-top: 1px solid #eee;
`;

export const ListItem = styled.li`
	display: flex;
	align-items: center;
	padding: 0.9375rem 1.25rem; /* 15px 20px */
	border-bottom: 1px solid #eee;
	cursor: pointer;

	& img {
		margin-right: 1rem; /* 16px */
	}

	&:hover {
		background: #f9f9f9;
	}

	span {
		flex: 1;
	}
`;

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ModalContent = styled.div`
	background: #fff;
	border-radius: 0.625rem; /* 10px */
	text-align: center;
	max-width: 21.375rem; /* 342px */
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 1.25rem 0; /* 20px 0 */

	width: 21.375rem; /* 342px */
	height: 14.25rem; /* 228px */
	flex-shrink: 0;
`;

export const ModalButtonContainer = styled.div`
	display: flex;
	width: 100%;
	border-top: 1px solid #eee;
`;

export const ModalButton = styled.button`
	flex: 1;
	padding: 0.625rem; /* 10px */
	font-size: 0.875rem; /* 14px */
	cursor: pointer;

	&:first-child {
		border-right: 1px solid #eee;
		color: #000;
	}

	&:last-child {
		color: red;
	}
`;