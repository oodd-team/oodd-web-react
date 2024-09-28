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
	color: ${(props) => (props.color ? props.color : theme.colors.black)};
	white-space: pre-line;
`;
