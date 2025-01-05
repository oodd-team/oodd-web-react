import { newRequest } from '@apis/core';

import type { SendPostReportRequest, SendPostReportResponse } from './dto';

// 게시글 신고 API
export const sendPostReportApi = (data: SendPostReportRequest) =>
	newRequest.post<SendPostReportResponse>('/post-report', data);
