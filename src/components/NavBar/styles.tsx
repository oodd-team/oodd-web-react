import styled from 'styled-components';
import theme from '../../styles/theme';

export const NavBarContainer = styled.nav`
	position: fixed;
	width: 100%;
	max-width: 32rem;
	height: 5.5rem;
	justify-content: center;
	align-items: center;
	bottom: 0;
	background: ${theme.colors.gradient};  // 여기서 그래디언트 색상 사용
	max-width: 32rem;
	margin: 0;
	border-radius: 1.25rem 1.25rem 0 0;
	filter: drop-shadow(0rem 0rem 0.25rem rgba(0, 0, 0, 0.25));
	z-index: 10;
`;

export const NavBarWrapper = styled.div`
	display: flex;
	margin-top: 0.5rem;
	justify-content: space-around;
`;

export const IconWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 70px;
	cursor: pointer;
	gap: 10px;


	p {
		margin: 0;
		bottom: 0;
		color: white;
		text-align: center;
		font-family: 'Pretendard'
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}
`;

export const IconImg = styled.img`
	width: 16px;
	height: 16px;

`;
