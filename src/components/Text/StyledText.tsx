import styled from 'styled-components';
import theme from '../../styles/theme';

interface StyledTextProps {
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
