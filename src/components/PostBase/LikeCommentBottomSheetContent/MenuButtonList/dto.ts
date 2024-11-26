export interface MenuButtonProps {
	text: string;
	action: () => void;
	icon: string;
	color?: string;
}

export interface MenuButtonListProps {
	items: MenuButtonProps[];
	isVisible: boolean;
}
