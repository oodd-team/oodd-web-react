import styled from 'styled-components';

export const ProfileEditContainer = styled.div`
	flex-grow: 1; /* flexbox에서 공간을 채우도록 설정 */
	width: 100%;
	max-width: 600px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ProfilePicWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 50px; /* 20px */
`;

export const ProfilePic = styled.div`
	width: 7.25rem; /* 116px */
	height: 7.25rem; /* 116px */
	flex-shrink: 0;
	border-radius: 50%;
	overflow: hidden;
	margin-top: 2.125rem; /* 34px */
	margin-bottom: 15px; /* 20px */

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const Label = styled.label`
	font-size: 0.875rem; /* 14px */
	color: #333;
`;

export const Input = styled.input`
	width: calc(100% - 6.25rem - 10px); /* 라벨과 간격을 제외한 너비 */
	padding: 0.5rem; /* 8px */
	margin-left: 10px;
	border: 1px solid #ccc;
	border: 0px;
	box-sizing: border-box;
	padding: 10px;
`;

export const Button = styled.button`
	text-decoration: underline;
	margin-top: 0.8rem;
	background: none;
	border: none;
	cursor: pointer;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	margin-top: 10px; /* Row 간격 10px */
	padding: 0px 20px;

	${Label} {
		width: 6.25rem; /* 100px */
	}
`;

export const FileInput = styled.input`
	display: none;
`;
