import { atom } from 'recoil';
import { BlockInfoDto } from '../../components/BottomSheet/OptionsBottomSheet/dto';

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

export const PostBlockAtom = atom<BlockInfoDto | null>({
	key: 'PostBlockAtom',
	default: null,
});
