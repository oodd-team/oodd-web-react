import { atom } from 'recoil';
import { CombineDataProps } from '../../pages/ProfileViewer/CombineDataProps';

export const UserInfoAtom = atom<CombineDataProps | null>({
	key: 'UserInfoAtom',
	default: null,
});

export const isFriendAtom = atom<boolean>({
	key: 'isFriendAtom',
	default: false,
});
