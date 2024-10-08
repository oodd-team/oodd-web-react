import { atom } from 'recoil';
import { PostCommentDto } from '../../pages/Home/BottomSheets/dto';

export const IsOpenPostCommentBottomSheetAtom = atom<boolean>({
	key: 'isOpenPostCommentBottomSheetAtom',
	default: false,
});

export const IsOpenPostCommentSuccessModalAtom = atom<boolean>({
	key: 'IsOpenPostCommentSuccessModalAtom',
	default: false,
});

export const IsOpenPostCommentFailModalAtom = atom<boolean>({
	key: 'IsOpenPostCommentFailModalAtom',
	default: false,
});

export const PostCommentAtom = atom<PostCommentDto | null>({
	key: 'PostCommentAtom',
	default: null,
});
