export interface InstaConnectModalProps {
	onIdSelect: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
}

export interface FailedModalProps {
	onNext: () => void;
	instagramId: string;
}
