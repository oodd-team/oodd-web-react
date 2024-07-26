import styled from 'styled-components';

export const TopbarLayout = styled.div`
	display: flex;
	margin: auto auto 16px auto;
	width: 100%;
	height: 44px;
	justify-contents: space-evenly;
	border-bottom: solid 1px #c4c4c4;
`;

export const BackButton = styled.img`
	width: 24.09px;
	height: 24.09px;
	cursor: pointer;
	background-size: cover;
	background-position: center;
	margin: auto;
	margin-left: 13px;
`;

export const KebabMenu = styled.img`
	width: 24px;
	height: 24px;
	cursor: pointer;
	background-size: cover;
	background-position: center;
	margin: auto;
	margin-right: 18px;
`;

export const Username = styled.div`
	margin-top: 13px;
`;
