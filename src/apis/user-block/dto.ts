// 차단/해제 요청 데이터
export interface PostUserBlockRequest {
	fromUserId: number;
	toUserId: number;
	action: 'block' | 'unblock'; // 차단 또는 해제
}
