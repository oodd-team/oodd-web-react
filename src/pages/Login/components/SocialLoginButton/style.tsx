import styled from 'styled-components';
import { StyledText } from '../../../../components/Text/StyledText';

export const SocialLoginContainer = styled.button<{ $bgColor: string; $border?: boolean }>`
	display: flex;
	align-items: center;
	width: calc(100% - 3.5rem);
	max-width: 40rem;
	height: 3.5rem;
	background-color: ${({ $bgColor }) => $bgColor};
	border-radius: 0.5rem;
	border: ${({ $border }) => ($border ? '1px solid #000' : 'none')};
	cursor: pointer;
	margin-bottom: 0.5rem;
	box-sizing: border-box;
`;

export const LogoImgWrapper = styled.figure`
	display: flex;
	align-items: center;
	width: 2.25rem;
	height: 2.25rem;
	margin-left: 1rem;
`;

export const LogoImage = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

export const StyledTextWrapper = styled(StyledText)<{ $left?: string }>`
	display: flex;
	width: 12.5rem;
	padding-left: ${({ $left }) => $left || '1.2rem'};
	align-items: center;
	margin: 0 auto;
`;
