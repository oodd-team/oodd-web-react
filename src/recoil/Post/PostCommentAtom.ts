import { atom } from 'recoil';

import type { Comment } from '@apis/post-comment/dto';

export const IsCommentDeleteConfirmationModalOpenAtom = atom<boolean>({
	key: 'isCommentDeleteConfirmationModalOpenAtom',
	default: false,
});

export const IsCommentReportModalOpenAtom = atom<boolean>({
	key: 'IsCommentReportModalOpenAtom',
	default: false,
});

export const selectedCommentAtom = atom<Comment | null>({
	key: 'selectedCommentAtom', // 고유 키
	default: null, // 초기값
});
