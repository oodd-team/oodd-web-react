export interface Post {
	imgs: string[];
    caption: string;
}

export interface InstaConnectModalProps {
    onClose: () => void;
    onNext: (posts: Post[]) => void;
    accessToken: string; 
}
export interface FailedModalProps {
	onNext: () => void;
	instagramId: string;
}
