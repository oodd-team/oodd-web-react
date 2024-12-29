import { useMediaQuery } from 'react-responsive';

import { styled } from 'styled-components';

import theme from '@styles/theme';

import type { StyledTextProps } from './dto';

export const StyledText = styled.div<StyledTextProps>`
	color: ${(props) => props.color || theme.colors.text.primary};
	white-space: pre-line;
	${(props) => {
		const isMobile = useMediaQuery({ maxWidth: '767px' });
		const isTabletPortrait = useMediaQuery({ minWidth: '768px', maxWidth: '991px' });
		const isTabletLandscape = useMediaQuery({ minWidth: '992px', maxWidth: '1219px' });
		const isDesktop = useMediaQuery({ minWidth: '1220px' });

		let fontStyle;

		if (typeof props.$textTheme.style === 'string') {
			// style이 문자열이면 일괄적으로 사용
			fontStyle = theme.fontStyles[props.$textTheme.style];
		} else if (typeof props.$textTheme.style === 'object') {
			// style이 객체면 기기에 따른 분기
			if (isMobile) {
				fontStyle = theme.fontStyles[props.$textTheme.style.mobile];
			} else if (isTabletPortrait || isTabletLandscape) {
				fontStyle = theme.fontStyles[props.$textTheme.style.tablet];
			} else if (isDesktop) {
				fontStyle = theme.fontStyles[props.$textTheme.style.desktop];
			}
		}

		return fontStyle;
	}};
`;
