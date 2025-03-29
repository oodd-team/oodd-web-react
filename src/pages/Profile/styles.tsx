import { styled } from 'styled-components';

export const ProfileContainer = styled.div`
	width: 100%;
	flex-grow: 1;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-self: center;
	box-sizing: border-box;
	overflow-y: auto;
	padding-top: 0rem;
`;

export const ProfileDetail = styled.div`
	flex: 1;
	margin-left: 15px;
	display: flex;
	flex-direction: column;
	gap: 5px;
`;

export const Header = styled.div`
	margin: 0.5rem 1.25rem;
	display: flex;
	align-items: center;
	padding: 0rem;
`;

export const StatsContainer = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 0.625rem 0;
	border-top: 1px solid ${({ theme }) => theme.colors.background.divider};
	border-bottom: 1px solid ${({ theme }) => theme.colors.background.divider};
`;

export const Stat = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StatNumber = styled.div`
	color: ${({ theme }) => theme.colors.text.caption};
	text-align: center;
	font-family: 'Pretendard';
	font-size: 1rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export const StatLabel = styled.div`
	color: ${({ theme }) => theme.colors.caption};
	text-align: center;
	font-family: 'Pretendard';
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 300;
`;

export const PostsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 0.9375rem;
	margin-bottom: 100px;
	padding: 20px;
	width: 100%;

`;

export const AddButton = styled.button`
	position: absolute;
	bottom: 6.75rem;
	right: 1.25rem;
	width: 5rem;
	height: 5rem;
	border: none;
	border-radius: 50%;
	z-index: 2;
`;

export const NoPostWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 5rem;
`;

export const Button = styled.button`
	width: 100%;
	margin: 1.25rem auto;
	height: 3.1rem;
	text-align: center;
	color: ${({ theme }) => theme.colors.text.contrast};
	cursor: pointer;
	box-sizing: border-box;
	border-radius: 0.625rem;
	padding: 0.625rem;
	background: ${({ theme }) => theme.colors.brand.gradient};
`;

export const ButtonSkeleton = styled.button`
	width: 90%;
	margin: 16px auto;
`;
