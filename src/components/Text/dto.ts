import theme from '@styles/theme';

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

export type FontStyleKey = keyof typeof theme.fontStyles;
