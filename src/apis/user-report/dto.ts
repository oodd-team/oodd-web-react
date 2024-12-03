// 사용자 신고 요청 데이터
export interface PostUserReportRequest {
	fromUserId: number;
	toUserId: number;
	reason: string;
}
