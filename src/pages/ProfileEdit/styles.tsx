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

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const Label = styled.label`
	font-size: 0.875rem; /* 14px */
	color: #333;
	margin-top: 0.625rem; /* 10px */
	align-self: flex-start;
`;

export const Input = styled.input`
	width: 100%;
	padding: 0.5rem; /* 8px */
	margin-top: 0.3125rem; /* 5px */
	margin-bottom: 1.25rem; /* 20px */
	border: 0px solid #ccc;
	border-radius: 0.25rem; /* 4px */
`;

export const TextArea = styled.textarea`
	width: 100%;
	padding: 0.5rem; /* 8px */
	height: 6.25rem; /* 100px */
	margin-top: 0.3125rem; /* 5px */
	margin-bottom: 1.25rem; /* 20px */
	border: 0px solid #ccc;
	border-radius: 0.25rem; /* 4px */
`;

export const Button = styled.button`
	text-decoration: underline;
	color: var(--Color-black, #000);

	/* Button2/Medium */
	font-family: 'Pretendard Variable';
	font-size: 0.8125rem; /* 13px */
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	margin-top: 0.625rem; /* 10px */
	background: none;
	border: none;
	cursor: pointer;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	margin-top: 0.625rem; /* 10px */

	${Label} {
		width: 6.25rem; /* 100px */
	}

	${Input}, ${TextArea} {
		flex: 1;
	}
`;

export const FileInput = styled.input`
	display: none;
`;
