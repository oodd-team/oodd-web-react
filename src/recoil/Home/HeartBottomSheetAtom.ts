import { atom } from 'recoil';
import { PostRequestDto } from '../../pages/Home/BottomSheets/dto';

export const IsOpenHeartBottomSheetAtom = atom<boolean>({
	key: 'isOpenHeartBottomSheetAtom',
	default: false,
});

export const IsOpenRequestSuccessModalAtom = atom<boolean>({
	key: 'IsOpenRequestSuccessModalAtom',
	default: false,
});

export const IsOpenRequestFailModalAtom = atom<boolean>({
	key: 'IsOpenRequestFailModalAtom',
	default: false,
});

export const PostRequestAtom = atom<PostRequestDto | null>({
	key: 'PostRequestAtom',
	default: null,
});
