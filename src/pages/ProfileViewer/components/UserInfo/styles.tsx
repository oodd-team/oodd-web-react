import styled from 'styled-components';

interface UserImgProps {
	$imgUrl?: string;
}

export const UserInfoContainer = styled.div`
	display: flex;
	width: 100%;
	max-width: 32rem;
	flex-direction: column; // 전체적으로 감싸는 요소들이 세로로 정렬
	padding: 0.625rem; // 10px
`;

export const UserProfile = styled.div`
	display: flex;
	flex-direction: row;
	padding-left: 1rem;
`;

export const UserImg = styled.div<UserImgProps>`
	width: 4.5rem; // 72px
	min-height: 4.5rem; // 72px
	background-color: #d9d9d9;
	background-image: url(${(props) => props.$imgUrl});
	background-size: cover;
	background-position: center;
	border-radius: 50%;
`;

export const UserDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: left;
	gap: 0.5rem; // 8px
	margin-left: 1rem;
`;

export const Bio = styled.div`
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	max-width: 15.5rem;
	width: 100%;
	text-overflow: ellipsis;
`;

export const ButtonContainer = styled.div`
	display: flex;
	gap: 2.1875rem; // 35px
	margin-top: 1rem;
	justify-content: center;
`;

export const Button = styled.button<{ $color?: string; $backgroundcolor: string }>`
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	align-items: center;
	width: 100%;
	max-width: 10.25rem; // 164px
	height: 2.45rem; // 44px
	color: ${({ $color }) => $color};
	background: ${({ $backgroundcolor }) => $backgroundcolor};
	border: 0.0625rem solid #000000; // 1px
	border-radius: 0.3125rem; // 5px
	overflow: hidden; // 요소가 버튼 밖으로 나가지 않도록 함
`;

export const Icon = styled.img`
	display: display;
	width: 100%;
	max-width: 1.5rem; // 24px
	height: 100%;
	max-height: 1.5rem; // 24px
`;

export const LongButton = styled.button`
	display: flex;
	justify-content: center;
	width: 100%;
	max-width: 21rem; // 350px
	gap: 0.5rem; // 8px
	height: 2.45rem; // 44px
	background-color: #000;
	border-radius: 0.3125rem; // 5px
	align-items: center;
`;
