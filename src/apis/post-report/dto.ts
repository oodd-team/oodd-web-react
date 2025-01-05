import type { BaseSuccessResponse } from '@apis/core/dto';

interface BaseReport {
	id: number; // 신고 ID
	userId: number; // 신고 생성 사용자 ID
	postId: number; // 신고된 게시글 ID
	content: string; // 신고된 게시글 내용
	repostReason: string; // 신고 사유
}

// 게시글 신고 요청 DTO
export interface SendPostReportRequest {
	requesterId: number; // 신고하는 사용자 ID
	postId: number; // 신고 대상 게시글 ID
	reason: string; // 신고 사유
}

// 게시물 신고 응답 데이터
export interface SendPostReportData extends BaseReport {
	requesterId: number; // 신고하는 사용자 ID
	postId: number; // 신고 대상 게시글 ID
	reason: string; // 신고 사유
}

// 게시물 신고 응답 타입
export type SendPostReportResponse = BaseSuccessResponse<SendPostReportData>;
