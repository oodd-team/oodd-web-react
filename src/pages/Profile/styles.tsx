import styled from 'styled-components';

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

export const Header = styled.div`
	margin: 8px 20px;
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
	color: ${({ theme }) => theme.colors.caption};	
	//변경된 컬러시스템에서의 gray4가 800으로 나와있어서 적용해보면 색상이 다르게 나옵니다!
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
	gap: 15px;
	cursor: pointer;
	margin-bottom: 100px;
	padding: 20px;
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
	margin-top: 80px;
`;

export const Button = styled.button`
	width: 100%;
	margin: 1.25rem auto;
	height: 3.1rem; 
	text-align: center;
	color: ${({ theme }) => theme.colors.contrast};	
	cursor: pointer;
	box-sizing: border-box;
	border-radius: 10px;
	padding: 10px;
	background: ${({ theme }) => theme.colors.brand.gradient};`;
