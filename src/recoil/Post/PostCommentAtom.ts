import { atom } from 'recoil';

export const IsCommentDeleteConfirmationModalOpenAtom = atom<boolean>({
	key: 'isCommentDeleteConfirmationModalOpenAtom',
	default: false,
});

export const IsCommentReportModalOpenAtom = atom<boolean>({
	key: 'IsCommentReportModalOpenAtom',
	default: false,
});
