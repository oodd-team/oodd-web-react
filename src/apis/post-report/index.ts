import { newRequest } from "../core";
import { SendPostReportRequest, SendPostReportResponse } from "./dto";

// 게시글 신고 API
export const createPostReportApi = (data: SendPostReportRequest) =>
  newRequest.post<SendPostReportResponse>('/post-report', data);
