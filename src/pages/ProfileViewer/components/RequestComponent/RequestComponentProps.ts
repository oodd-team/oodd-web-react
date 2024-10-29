export interface RequestComponentProps {
	userId: number;
	nickname: string;
	setFriend: (visible: boolean) => void;
	setIsBottomSheetOpen: (visible: boolean) => void;
	handleModalOpen: (message: string) => void;
}
