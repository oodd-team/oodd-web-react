export interface ReportBottomSheetMenuProps {
	onCloseReportSheet: () => void;
	onOpenStatusModal: () => void;
	sendReport: (reason: string) => void;
	isUserReport: boolean;
}
