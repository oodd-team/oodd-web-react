import styled from 'styled-components';

export const ProfileViewerContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

export const Vector = styled.div`
	box-sizing: border-box;
	max-width: 32rem;
	width: 100%;
	height: 0;
	border: 0.0625rem solid #c4c4c4; // 1px
`;

export const CounterContainer = styled.section`
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

export const PostListContainer = styled.section`
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
