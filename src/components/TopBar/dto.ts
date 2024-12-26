export interface TopBarProps {
	text?: string;
	RightButtonSrc?: string;
	LeftButtonSrc?: string;
	onLeftButtonClick?: () => void;
	onRightButtonClick?: () => void;
	$withBorder?: boolean;
}

export interface TopBarLayoutProps {
	$withBorder?: boolean;
}
