import styled from 'styled-components';
import theme from '../../styles/theme';

export interface StyledTextProps {
	$textTheme: {
		style: keyof typeof theme.fontStyles;
		lineHeight: number;
	};
	color?: string;
}

export const StyledText = styled.div<StyledTextProps>`
	${(props) => props.theme.fontStyles[props.$textTheme.style]};
	line-height: ${(props) => props.$textTheme.lineHeight}rem;
	color: ${(props) => (props.color ? props.color : theme.colors.black)};
	white-space: pre-line;
`;

//StyledText 컴포넌트
const Body1MediumText = styled.div`
  font-weight: 500; /* or the weight of 'body1-medium' */
  line-height: 2;
  color: ${({ theme }) => theme.colors.black};
`;

const Body2LightText = styled.div`
  font-weight: 300; /* or the weight of 'body2-light' */
  line-height: 1;
  color: ${({ theme }) => theme.colors.black};
`;

const Body4LightGrayText = styled.span`
  font-weight: 300; /* or the weight of 'body4-light' */
  line-height: 1;
  color: ${({ theme }) => theme.colors.gray3};
`;

export { Body1MediumText, Body2LightText, Body4LightGrayText };

