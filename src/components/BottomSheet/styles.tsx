import React from 'react';
import styled from 'styled-components';
import XIcon from '../../assets/default/x.svg';

export const BottomSheetWrapper = styled.div<{ $isBottomSheetOpen: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.3);
	opacity: ${({ $isBottomSheetOpen }) => ($isBottomSheetOpen ? 1 : 0)};
	visibility: ${({ $isBottomSheetOpen }) => ($isBottomSheetOpen ? 'visible' : 'hidden')};
	transition:
		opacity 0.2s ease-out,
		visibility 0.3s ease-out;
`;

export const BottomSheetLayout = styled.div.attrs<{ $currentTranslateY: number; $isBottomSheetOpen: boolean }>(
	({ $currentTranslateY, $isBottomSheetOpen }) => ({
		style: {
			transform: `translate(-50%, ${$isBottomSheetOpen ? `${$currentTranslateY}px` : '100%'})`,
		},
	}),
)`
	${({ theme }) => theme.visibleOnMobileTablet};
	position: fixed;
	bottom: 0;
	flex-direction: column;
	width: 100%;
	max-width: 512px;
	left: 50%;
	border-radius: 0.938rem 0.938rem 0 0;
	background-color: ${({ theme }) => theme.colors.white};
	padding: 0 1.25rem;
	z-index: 200;
	user-select: none;
	touch-action: none;
	transition: transform 0.3s;
`;

export const Handler = React.memo(styled.hr`
	width: 2.88rem;
	margin: 0.6rem auto 0 auto;
	height: 0.125rem;
	background-color: #d9d9d9;
	border: none;
	border-radius: 0.125rem;
	z-index: 300;
	cursor: pointer;
`);

export const SideBarLayout = styled.div<{ $isSideBarOpen: boolean }>`
	${({ theme }) => theme.visibleOnDesktop};
	width: 21.25rem;
	height: 100%;
	position: fixed;
	right: 0;
	background: white;
	transform: translateX(${({ $isSideBarOpen }) => ($isSideBarOpen ? 0 : '100%')});
	transition: transform 0.3s;
`;

export const SideBarTopBar = styled.header`
	display: flex;
	width: 100%;
	padding: 0.5rem 1rem;
	margin-top: 0;
`;

export const XButton = styled.button`
	width: 2.25rem;
	height: 2.25rem;
	margin: auto 0 auto auto;
	background-image: url(${XIcon});
	background-repeat: no-repeat;
	background-size: 17px;
	background-position: center;
`;

export const ComponentBox = styled.section`
	padding: 1rem 1.25rem;
`;
