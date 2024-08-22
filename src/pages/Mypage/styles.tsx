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
`;

export const Header = styled.div`
	margin-top: 0;
	display: flex;
	align-items: center;
	padding: 1.25rem 0; /* 20px 0 */
`;

export const AvatarWrapper = styled.div`
	width: 4.5rem; /* 72px */
	height: 4.5rem; /* 72px */
	border-radius: 50%;
	overflow: hidden;
	margin-right: 1.25rem; /* 20px */
	margin-left: 30px;
`;

export const Avatar = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const Username = styled.div`
	color: var(--Color-black, #000);

	/* Body1/Medium */
	font-family: 'Gmarket Sans';
	font-size: 1rem; /* 16px */
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export const Bio = styled.div`
	color: var(--Color-gray4, #434343);

	/* Body4/Light */
	font-family: 'Pretendard Variable';
	font-size: 0.8125rem; /* 13px */
	font-style: normal;
	font-weight: 300;
	line-height: normal;

	margin-top: 10px;
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
	color: var(--Color-gray4, #434343);
	text-align: center;

	/* Body1/Medium */
	font-family: 'Gmarket Sans';
	font-size: 1rem; /* 16px */
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export const StatLabel = styled.div`
	color: var(--Color-gray4, #434343);
	text-align: center;

	/* Body6/Light */
	font-family: 'Pretendard Variable';
	font-size: 0.75rem; /* 12px */
	font-style: normal;
	font-weight: 300;
	line-height: normal;
`;

export const PostsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between; /* 두 개씩 나란히 배치 */
	gap: 0; /* 간격을 없앰 */
	cursor: pointer;
`;
