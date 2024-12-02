import styled from 'styled-components';

export const ProfileEditContainer = styled.div`
	flex-grow: 1; /* flexbox에서 공간을 채우도록 설정 */
	width: 100%;
	//max-width: 600px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ProfilePicWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 10px; /* 20px */
	position: relative;
`;

export const Label = styled.label`
	font-size: 0.875rem; /* 14px */
	color: #333;
`;

export const Input = styled.input`
	width: 100%; /* Row의 padding에 맞춰 꽉 채우기 */
	padding: 25px; /* 10px padding */
	margin: 10px 0; /* 위아래 간격 조정 */
	border: 0px;
	box-sizing: border-box;
	border-radius: 10px;
	background-color: #f0f0f0; /* 박스 내부 회색 배경 */
	text-align: left;
`;

export const Button = styled.button`
	position: absolute;
	bottom: 10px;
	right: 10px;
	z-index: 1;
	width: 1.7rem;
	height: 1.7rem;
	padding: 0.3rem;
	border-radius: 50%;
	background-color: white;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
	border: 1px solid #ddd; /* 아이콘 테두리 */
	cursor: pointer;
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

export const CameraIcon = styled.img``;

export const Row = styled.div`
	display: flex;
	flex-direction: column; /* 세로 배치 */
	align-items: stretch;
	width: 100%;
	margin-top: 0px; /* Row 간격 10px */
	padding: 0px 20px; /* 좌우 여백 20px */

	${Label} {
		width: 6.25rem; /* 100px */
	}
`;

export const FileInput = styled.input`
	display: none;
`;

export const UserInfo = styled.button``;

export const Username = styled.button`
	color: #000;
	font-family: Pretendard;
	font-size: 22px;
	font-style: normal;
	font-weight: 700;
	line-height: 136.4%; /* 30.008px */
	letter-spacing: -0.427px;
`;

