export interface TopBarProps {
    ID?: string; // 사용자 ID, optional prop
    text?: string; // 텍스트, optional prop
	kebabMenuSrc?: string; // KebabMenuButton src의 Optional prop
    BackIcon?: string; // BackButton src의 Optional prop
    onBackClick?: () => void; // BackButton src의 Optional prop
    onKebabClick?: () => void; // KebabMenuButton src의 Optional prop
    }

export interface TopbarLayoutProps {
	$withBorder?: boolean;
  }
