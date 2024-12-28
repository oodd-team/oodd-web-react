// 사용자 신고 요청 데이터
export interface PostUserReportRequest {
	requesterId: number;
	targetId: number;
	reason: string;
}
