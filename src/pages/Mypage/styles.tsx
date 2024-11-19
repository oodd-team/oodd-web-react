import styled from 'styled-components';

export const ProfileContainer = styled.div`
	width: 100%;
	flex-grow: 1;
	margin: 0 auto; /* 중앙 정렬 */
	display: flex;
	flex-direction: column;
	align-self: center;
	box-sizing: border-box; /* 패딩을 포함한 전체 크기를 설정 */
	overflow-y: auto; /* 내용이 넘칠 경우 스크롤 */
	padding-top: 0rem;
`;

export const Header = styled.div`
	margin-top: 0;
	display: flex;
	align-items: center;
	padding: 0rem;
	margin-left: 20px;
`;

export const StatsContainer = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 0.625rem 0; /* 10px 0 */
	border-top: 1px solid #eee;
	border-bottom: 1px solid #eee;
`;

export const Stat = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StatNumber = styled.div`
	color: var(--Color-gray4, #8e8e8e);
	text-align: center;

	font-family: 'Pretendard';
	font-size: 1rem; /* 16px */
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export const StatLabel = styled.div`
	color: var(--Color-gray4, #8e8e8e);
	text-align: center;
	font-family: 'Pretendard';
	font-size: 0.75rem; /* 12px */
	font-style: normal;
	font-weight: 300;
`;

export const PostsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between; /* 두 개씩 나란히 배치 */
	gap: 15px;
	cursor: pointer;
	margin-bottom: 100px;
	padding: 20px;
`;

export const AddButton = styled.button`
	position: absolute;
	bottom: 6.75rem;
	right: 1.25rem;
	width: 5rem;
	height: 5rem;
	border: none;
	border-radius: 50%;
	z-index: 2;
`;
