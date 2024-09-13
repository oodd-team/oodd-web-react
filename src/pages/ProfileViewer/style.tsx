import styled from 'styled-components';
import backIcon from '../../assets/ProfileViewer/backIcon.svg';
import moreIcon from '../../assets/ProfileViewer/moreIcon.svg';

export const ProfileViewerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

export const HeaderContainer = styled.div`
	width: 100%;
	max-width: 512px;
	height: 2.75rem; // 44px
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 0.9375rem; // 15px
	padding: 0 1rem;
`;

export const BackButton = styled.button`
	width: 1.25rem; // 20px
	height: 1.25rem; // 20px
	cursor: pointer;
	background-image: url(${backIcon});
	background-repeat: no-repeat;
	background-position: center;
`;

export const UserID = styled.div`
	width: 1.875rem; // 30px
	height: 1.1875rem; // 19px
	left: calc(50% - 1.875rem / 2);
	color: #000000;
`;

export const MoreIcon = styled.button`
	width: 1.5rem; // 24px
	height: 1.5rem; // 24px
	cursor: pointer;
	background-image: url(${moreIcon});
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
`;

export const Vector = styled.div`
	box-sizing: border-box;
	max-width: 32rem;
	width: 100%;
	height: 0;
	border: 0.0625rem solid #c4c4c4; // 1px
`;

export const CounterContainer = styled.div`
	display: flex;
	width: 100%;
	max-width: 32rem;
	justify-content: space-around;
	align-items: center;
`;

export const Count = styled.div`
	display: flex;
	flex-direction: column; // 세로 정렬
	align-items: center;
	justify-content: center;
	gap: 0.3125rem; // 5px
	margin-top: 0.5625rem; // 9px
	margin-bottom: 0.8125rem; // 13p
`;

export const PostListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	max-width: 32rem;
	overflow-y: auto;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;
