import styled from 'styled-components';

export const ProfileEditContainer = styled.div`
	margin: 0 auto;
	width: 100%;

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

	& img:first-child {
		margin-right: 1rem; /* 첫 번째 이미지(왼쪽 아이콘)의 오른쪽 간격 설정 */
	}

	& img:last-child {
		margin-left: auto; /* 마지막 이미지(오른쪽 화살표 아이콘)를 오른쪽으로 정렬 */
	}

	&:hover {
		background: #f9f9f9;
	}

	span {
		flex: 1;
		text-align: left; /* 텍스트 왼쪽 정렬 */
	}
`;
