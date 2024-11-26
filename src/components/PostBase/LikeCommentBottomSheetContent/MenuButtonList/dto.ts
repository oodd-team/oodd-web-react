export interface MenuButtonProps {
	text: string;
	action: () => void;
	icon: string;
	backgroundColor?: string;
}

export interface MenuButtonListProps {
	items: MenuButtonProps[];
	isVisible: boolean;
}
