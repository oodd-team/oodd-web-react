const commonErrorMessage: Record<number, string> = {
	0: '알 수 없는 오류입니다.\n관리자에게 문의해 주세요.',
	400: '잘못된 요청입니다.',
	401: '인증에 실패했습니다.',
	403: '접근이 거부되었습니다.',
	500: '서버 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
	999: '서버 응답이 없습니다.\n잠시 후 다시 시도해 주세요.',
};

export const defaultErrorMessage: Record<number, string> = {
	...commonErrorMessage,
	404: '존재하지 않는 요청입니다.',
};

export const userErrorMessage: Record<number, string> = {
	...commonErrorMessage,
	404: '유저 정보를 찾을 수 없습니다.',
};

export const postErrorMessage: Record<number, string> = {
	...commonErrorMessage,
	404: '게시글 정보를 찾을 수 없습니다.',
};

export const postCommentErrorMessage: Record<number, string> = {
	...commonErrorMessage,
	404: '댓글 정보를 찾을 수 없습니다.',
};

export const matchingErrorMessage: Record<number, string> = {
	...commonErrorMessage,
	404: '요청 정보를 찾을 수 없습니다.',
};

export const chatErrorMessage: Record<number, string> = {
	...commonErrorMessage,
	404: '채팅방 정보를 찾을 수 없습니다.',
};

export type ApiDomain = 'user' | 'post' | 'postComment' | 'matching' | 'chat' | 'default';

export const errorMessages: Record<ApiDomain, Record<number, string>> = {
	user: userErrorMessage,
	post: postErrorMessage,
	postComment: postCommentErrorMessage,
	matching: matchingErrorMessage,
	chat: chatErrorMessage,
	default: defaultErrorMessage,
};
