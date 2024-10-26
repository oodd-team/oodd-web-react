import styled from 'styled-components';
import { StyledText } from '../../../../components/Text/StyledText';

export const RequestContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 1.5625rem 0 2.5rem 0;
	gap: 2.0625rem;
`;

export const RequestMessage = styled(StyledText)`
	display: flex;
	text-align: center;
	height: 100%;
	width: 15rem;
`;
export const ComentContainer = styled.figure`
	align-items: center;
	width: 100%;
	max-width: 21.875rem; // 동일하게 맞춤
	position: relative; // 아이콘을 절대 위치로 배치하기 위함
`;

export const Coment = styled.textarea`
	display: flex;
	font-family: Pretendard;
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	border-radius: 0.5rem;
	border: 0.0625rem solid var(--main-color-light-hover, #ffdeed);
	width: 100%;
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
	cursor: pointer;
`;
