import { atom } from 'recoil';
import { PostBlockDto } from '../../pages/Home/BottomSheets/dto';

export const IsOpenBlockConfirmationModalAtom = atom<boolean>({
	key: 'isOpenBlockConfirmationModalAtom',
	default: false,
});

export const IsOpenBlockSuccessModalAtom = atom<boolean>({
	key: 'IsOpenBlockSuccessModalAtom',
	default: false,
});

export const IsOpenBlockFailModalAtom = atom<boolean>({
	key: 'IsOpenBlockFailModalAtom',
	default: false,
});

export const PostBlockAtom = atom<PostBlockDto | null>({
	key: 'PostBlockAtom',
	default: null,
});
