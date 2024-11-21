import { newRequest } from "../core";
import { BaseSuccessResponse } from '../core/dto';

// 게시글 신고 요청 
export interface SendPostReportRequest {
  requesterId: number; // 요청자 ID
  postId: number;      // 게시글 ID
  reason: string;      // 신고 사유
}

// 공통 필드 인터페이스
interface BaseReport {
	id: number;
	userId: number;
	postId: number;
	content: string;
	repostReason: string;
}

// 게시물 신고 응답
export type SendPostReportResponse = BaseSuccessResponse<SendPostReportData>;

export interface SendPostReportData extends BaseReport {
  requesterId: number; // 신고하는 사용자 ID
  postId: number; // 신고 대상 게시글 ID
  reason: string; // 신고 사유 
}

export const createMatchingApi = (data: SendPostReportRequest) =>
	newRequest.post<SendPostReportResponse>('/post-report', data);
