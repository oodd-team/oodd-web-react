import styled from 'styled-components';

export const ProfileViewerContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
	position: relative;

	@media (min-width: 23.4375rem) and (max-width: 32rem) {
		padding: 0 1.25rem;
	}
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
	justify-content: space-around;
	align-items: center;
`;

export const Count = styled.div`
	display: flex;
	flex-direction: column; // 세로 정렬
	align-items: center;
	justify-content: center;
	gap: 0.3125rem;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
`;

export const PostListContainer = styled.section`
	display: flex;
	gap: 0.9375rem;
	flex-wrap: wrap;
	width: 100%;
	overflow-y: auto;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;
