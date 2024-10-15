export interface TopBarProps {
	text?: string; // 텍스트, optional prop
	RightButtonSrc?: string; // KebabMenuButton src의 Optional prop
	LeftButtonSrc?: string; // BackButton src의 Optional prop
	onLeftClick?: () => void; // BackButton src의 Optional prop
	onRightClick?: () => void; // KebabMenuButton src의 Optional prop
	$withBorder?: boolean;
}

export interface TopbarLayoutProps {
	$withBorder?: boolean;
}
