import { styled } from 'styled-components';

export const NavBarContainer = styled.nav`
	position: fixed;
	${({ theme }) => theme.visibleOnMobileTablet};
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;

	height: 5.5rem;
	justify-content: center;
	align-items: center;
	background: ${({ theme }) => theme.colors.brand.gradient};
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
		font-family: 'Pretendard';
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}
`;

export const Icon = styled.div`
	width: 1.13rem;
	height: 1.13rem;
	object-fit: cover;
`;

export const SideNavBarContainer = styled.nav`
	${({ theme }) => theme.visibleOnDesktop};
	height: 90%;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
	padding: 2.5rem 1.5rem;
	border-radius: 0 3rem 3rem 0;
	position: fixed;
	background: ${({ theme }) => theme.colors.background.primary};
	filter: drop-shadow(0rem 0rem 0.25rem rgba(0, 0, 0, 0.25));
`;

export const SideNavBarHeader = styled.header`
	display: flex;
	justify-content: space-between;

	.logo {
		width: 6.25rem;
	}

	button {
		width: 2rem;
		height: 2rem;
		padding: 0.25rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		transition: background 0.2s;
	}

	button:hover {
		background: ${({ theme }) => theme.colors.gray[200]};
	}
`;

export const SideNavBarButton = styled.label`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.8rem;
	cursor: pointer;
	padding: 0.5rem 0;

	button {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		padding: 0.6rem;
		background: ${({ theme }) => theme.colors.background.primary};
		transition: background 0.2s;

		box-shadow:
			0px 2px 4px 0px rgba(0, 0, 0, 0.2),
			0px 0px 2px 0px rgba(0, 0, 0, 0.12),
			0px 0px 2px 0px rgba(0, 0, 0, 0.12);
	}

	button:hover {
		background: ${({ theme }) => theme.colors.gray[200]};
	}

	img {
		width: 100%;
		height: 100%;
	}

	.styled-text {
		padding-right: 6rem;
		border-bottom: 1.5px solid #f2f2f2;
	}
`;

export const SideNavBarItem = styled.li`
	width: 100%;
	display: flex;
`;

export const SideNavBarList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const SideNavBarFooter = styled.footer`
	display: flex;
	justify-content: flex-start;
	position: absolute;
	bottom: 2rem;
`;
