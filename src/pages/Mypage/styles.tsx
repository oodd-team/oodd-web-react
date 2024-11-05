import styled from 'styled-components';

export const ProfileContainer = styled.div`
	width: 100%;
	//max-width: 32rem;
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

export const AvatarWrapper = styled.div`
	width: 4.5rem; /* 72px */
	height: 4.5rem; /* 72px */
	border-radius: 50%;
	overflow: hidden;
	margin-right: 1.25rem; /* 20px */
	margin-left: 30px;
	flex-shrink: 0; /* Flex 레이아웃에서 크기 고정 */
	position: relative; /* 필요한 경우 상대적인 위치 고정 */
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
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 144.5%; /* 26.01px */
	letter-spacing: -0.004px;
`;

export const Bio = styled.div`
	overflow: hidden;
	color: #888;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 22px; /* 157.143% */
	letter-spacing: -0.5px;

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
	line-height: normal;
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
	z-index: 2;

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray3};
	}
`;
