import styled from 'styled-components';

export const RequestContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 7rem 0 2.5rem 0;
	gap: 2.0625rem;
`;

export const RequestMessage = styled.div`
	display: flex;
	text-align: center;
	height: 100%;
	width: 16rem;
`;
export const ComentContainer = styled.figure`
	align-items: center;
	width: 100%;
	max-width: 21.875rem; // 동일하게 맞춤
	position: relative; // 아이콘을 절대 위치로 배치하기 위함
`;

export const Coment = styled.textarea`
	display: flex;
	font-family: 'Pretendard Variable';
	font-style: normal;
	font-weight: 300;
	font-size: 0.85rem;
	background-color: #f5f5f5;
	border: 1px solid #7b7b7b;
	border-radius: 0.1875rem;
	width: 100%; // 21.875rem -> 100%
	min-height: 3rem; // 최소 높이 설정
	padding: 1rem 2rem 0 0.5rem;
	box-sizing: border-box;
	overflow: hidden; // 스크롤을 숨김
	resize: none; // 사용자가 크기를 조절할 수 없도록 함
`;
export const MsgIcon = styled.img`
	position: absolute;
	right: 0.5rem; // 아이콘의 오른쪽 여백
	top: 50%; // 아이콘을 세로 중앙에 맞추기
	transform: translateY(-50%); // 아이콘을 정확히 중앙에 위치시키기
	width: 1.5rem;
	height: 1.5rem;
	cursor: pointer;
`;
