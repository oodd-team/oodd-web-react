export interface MenuButtonListProps {
	items: MenuButtonProps[];
	onClose: () => void;
	position: { top: number; left: number };
}

export interface MenuButtonProps {
	text: string;
	action: () => void;
	icon: string;
	color?: string;
}
