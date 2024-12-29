export interface OptionsBottomSheetProps {
	domain: 'user' | 'post';
	targetId: {
		// 차단/신고하기 대상
		userId?: number;
		postId?: number;
	};
	targetNickname?: string; // 차단/신고 대상 닉네임
	isBottomSheetOpen: boolean;
	onClose: () => void;
}
