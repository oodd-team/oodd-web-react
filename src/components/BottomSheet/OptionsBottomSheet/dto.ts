export interface OptionsBottomSheetProps {
	domain: 'user' | 'post';
	targetId: number; // 차단/신고 대상 userId 또는 postId
	targetNickname?: string; // 차단/신고 대상 닉네임
	onClose: () => void;
}

export interface BlockInfoDto {
	userId: number;
	friendId: number;
	friendName: string;
	action: 'toggle';
}
