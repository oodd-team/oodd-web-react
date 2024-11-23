import styled from 'styled-components';
import { StyledText } from '../../components/Text/StyledText';

export const LoginContainer = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	margin: 0 auto; /* 중앙 정렬 */
	//box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1); /* 경계 구분용*/
`;

export const WelcomeWrapper = styled.section`
	display: flex;
	flex-direction: column;
	max-width: 14rem;
	width: 100%;
	height: 5rem;
	text-align: center;
	margin-bottom: 1.5rem;
`;

export const StyledTextService = styled(StyledText).attrs({
	as: 'button', // button 태그로 변환
})`
	display: flex;
	border: none;
	width: 100%;
	justify-content: center;
	padding: 20px;
	margin-top: 6.875rem;
	cursor: pointer;
	&:hover {
		color: #ff2389; /* 호버 시 텍스트 색상 */
		transform: scale(1.05); /* 버튼 크기 확대 */
	}
`;
