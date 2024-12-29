export interface TopBarProps {
	text?: string;
	RightButtonSrc?: string;
	LeftButtonSrc?: string;
	onClickLeftButton?: () => void;
	onClickRightButton?: () => void;
	$withBorder?: boolean;
}

export interface TopBarLayoutProps {
	$withBorder?: boolean;
}
