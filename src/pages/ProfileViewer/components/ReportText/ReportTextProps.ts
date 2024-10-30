export interface ReportTextProps {
	onCloseBottomSheet: () => void;
	setIsInputVisible: (visible: boolean) => void;
	handleModalOpen: (message: string) => void;
}
