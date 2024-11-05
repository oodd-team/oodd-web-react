import { atom } from 'recoil';
import { PostRequestDto } from '../../components/PostBottomSheets/dto';

export const IsHeartBottomSheetOpenAtom = atom<boolean>({
	key: 'isHeartBottomSheetOpenAtom',
	default: false,
});

export const IsRequestSuccessModalOpenAtom = atom<boolean>({
	key: 'IsRequestSuccessModalOpenAtom',
	default: false,
});

export const IsRequestFailModalOpenAtom = atom<boolean>({
	key: 'IsRequestFailModalOpenAtom',
	default: false,
});

export const PostRequestAtom = atom<PostRequestDto | null>({
	key: 'PostRequestAtom',
	default: null,
});
