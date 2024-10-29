import { atom } from 'recoil';
import { PostBlockDto } from '../../pages/Home/BottomSheets/dto';

export const IsBlockConfirmationModalOpenAtom = atom<boolean>({
	key: 'isBlockConfirmationModalOpenAtom',
	default: false,
});

export const IsBlockSuccessModalOpenAtom = atom<boolean>({
	key: 'IsBlockSuccessModalOpenAtom',
	default: false,
});

export const IsBlockFailModalOpenAtom = atom<boolean>({
	key: 'IsBlockFailModalOpenAtom',
	default: false,
});

export const PostBlockAtom = atom<PostBlockDto | null>({
	key: 'PostBlockAtom',
	default: null,
});
