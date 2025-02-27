import { styled } from 'styled-components';

export const ProfileEditContainer = styled.div`
	flex-grow: 1;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

export const ProfilePicWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 0.625rem;
	position: relative;
`;

export const Label = styled.label`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.gray[700]};
`;

export const Input = styled.input`
	width: 100%;
	padding: 1.5625rem;
	margin: 0.625rem 0;
	border: 0rem;
	box-sizing: border-box;
	border-radius: 0.625rem;
	background-color: ${({ theme }) => theme.colors.background.secondary};
	text-align: left;
`;

export const Button = styled.button`
	position: absolute;
	bottom: 0.625rem;
	right: 0.625rem;
	z-index: 1;
	width: 1.7rem;
	height: 1.7rem;
	padding: 0.3rem;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.colors.background.primary};
	box-shadow: 0px 2px 4px ${({ theme }) => `${theme.colors.black}33`};
	border: 1px solid ${({ theme }) => theme.colors.gray[300]};
	cursor: pointer;
`;

export const ProfilePic = styled.div`
	width: 7.25rem;
	height: 7.25rem;
	flex-shrink: 0;
	border-radius: 50%;
	overflow: hidden;
	margin-top: 2.125rem;
	margin-bottom: 0.9375rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const CameraIcon = styled.img``;

export const Row = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	width: 100%;
	margin-top: 0rem;
	padding: 0rem 1.25rem;

	${Label} {
		width: 6.25rem;
	}
`;

export const EmailInput = styled.input`
	margin-bottom: 7.5rem;
	width: 100%;
	padding: 1.5625rem;
	border: 0px;
	box-sizing: border-box;
	border-radius: 0.625rem;
	background-color: ${({ theme }) => theme.colors.background.secondary};
	text-align: left;
`;

export const FileInput = styled.input`
	display: none;
`;

export const UserInfo = styled.div``;

export const Username = styled.button`
	color: ${({ theme }) => theme.colors.text.primary};
	font-family: Pretendard;
	font-size: 1.375rem;
	font-style: normal;
	font-weight: 700;
	line-height: 136.4%;
	letter-spacing: -0.0267rem;
`;
