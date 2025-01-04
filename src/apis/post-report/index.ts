import { SendPostReportRequest, SendPostReportResponse } from './dto';

import { newRequest } from '../core';

// 게시글 신고 API
export const sendPostReportApi = (data: SendPostReportRequest) =>
	newRequest.post<SendPostReportResponse>('/post-report', data);
