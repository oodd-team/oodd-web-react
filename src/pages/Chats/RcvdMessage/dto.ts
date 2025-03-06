export interface RcvdMessageProps {
	fromUserNickname: string;
	profilePictureUrl: string;
	content: string;
	isSenderChanged: boolean; // 상단 마진 추가 여부
	isProfileImageVisible: boolean; // 사용자 프로필 표시 여부
	isTimeVisible: boolean; // 메시지 옆 시간 표시 여부
	formattedTime: string; // 타임스탬프를 HH:MM 형태로 변환한 값
}
