import { atom } from 'recoil';
import { PostCommentDto } from '../../components/PostBottomSheets/dto';

export const IsPostCommentBottomSheetOpenAtom = atom<boolean>({
	key: 'isPostCommentBottomSheetOpenAtom',
	default: false,
});

export const IsPostCommentSuccessModalOpenAtom = atom<boolean>({
	key: 'IsPostCommentSuccessModalOpenAtom',
	default: false,
});

export const IsPostCommentFailModalOpenAtom = atom<boolean>({
	key: 'IsPostCommentFailModalOpenAtom',
	default: false,
});

export const PostCommentAtom = atom<PostCommentDto | null>({
	key: 'PostCommentAtom',
	default: null,
});
