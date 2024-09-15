import React from 'react';
import styled from 'styled-components';

export const BottomSheetWrapper = styled.div<{ $isOpenBottomSheet: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.3);
	opacity: ${({ $isOpenBottomSheet }) => ($isOpenBottomSheet ? 1 : 0)};
	visibility: ${({ $isOpenBottomSheet }) => ($isOpenBottomSheet ? 'visible' : 'hidden')};
	transition:
		opacity 0.2s ease-out,
		visibility 0.3s ease-out;
`;

export const BottomSheetLayout = styled.div<{
	$isOpenBottomSheet: boolean;
	$currentTranslateY: number;
	$isHandlerVisible: boolean;
}>`
	position: fixed;
	bottom: 0;
	flex-direction: column;
	width: 100%;
	max-width: 512px;
	left: 50%;
	border-radius: 0.938rem 0.938rem 0 0;
	background-color: ${({ theme }) => theme.colors.white};
	padding-top: ${({ $isHandlerVisible }) => ($isHandlerVisible ? '1.3rem' : '0.9375rem')};
	z-index: 200;
	user-select: none;
	touch-action: none;
	transform: translate(
		-50%,
		${({ $currentTranslateY, $isOpenBottomSheet }) => ($isOpenBottomSheet ? `${$currentTranslateY}px` : '100%')}
	);
	transition: transform 0.3s;
`;

export const Handler = React.memo(styled.hr`
	width: 3rem;
	margin: 0 auto;
	height: 0.25rem;
	background-color: ${({ theme }) => theme.colors.gray3};
	border: none;
	border-radius: 0.125rem;
	z-index: 300;
	cursor: pointer;
`);
