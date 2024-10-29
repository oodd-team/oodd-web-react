import styled from 'styled-components';

export const NavBarContainer = styled.nav`
	// fixed 포지션에 breakPoint를 적용하는 방법
	position: fixed;
	${({ theme }) => theme.visibleOnMobileTablet}; // breakPoint 미디어쿼리
	bottom: 0; // 경우에 따라 top 0 등으로 작성
	left: 50%; // 수직 중앙에 위치
	transform: translateX(-50%); // width에 따른 수직 중앙 조정
	width: 100%; // brakePoint에 따른 width에 따르도록 설정

	// 이후로 자기 코드에 맞춰서 작성
	height: 5.5rem;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.gradient}; // 여기서 그래디언트 색상 사용
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
