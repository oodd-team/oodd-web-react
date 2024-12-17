import styled from 'styled-components';
import theme from '../../styles/theme';
import { useMediaQuery } from 'react-responsive';

export type FontStyleKey = keyof typeof theme.fontStyles;

// 플랫폼 별 폰트가 다른 경우
interface FontStylesByPlatform {
	mobile: FontStyleKey;
	tablet: FontStyleKey;
	desktop: FontStyleKey;
}

export interface StyledTextProps {
	$textTheme: {
		style: FontStyleKey | FontStylesByPlatform;
		lineHeight?: number;
	};
	color?: string;
	children: any;
}

export const StyledText = styled.div<StyledTextProps>`
	color: ${(props) => props.color || theme.colors.black};
	white-space: pre-line;
	line-height: ${(props) => props.$textTheme.lineHeight || 1.5};
	${(props) => {
		const isMobile = useMediaQuery({ maxWidth: '767px' });
		const isTabletPortrait = useMediaQuery({ minWidth: '768px', maxWidth: '991px' });
		const isTabletLandscape = useMediaQuery({ minWidth: '992px', maxWidth: '1219px' });
		const isDesktop = useMediaQuery({ minWidth: '1220px' });

		let fontStyle;
		if (typeof props.$textTheme.style === 'string') {
			fontStyle = theme.fontStyles[props.$textTheme.style];
		} else if (typeof props.$textTheme.style === 'object') {
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
