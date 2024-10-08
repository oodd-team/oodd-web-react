import { atom } from 'recoil';
import { UserInfoProps } from '../../pages/ProfileViewer/dto';

export const UserInfoAtom = atom<UserInfoProps | null>({
	key: 'UserInfoAtom',
	default: null,
});

export const isFriendAtom = atom<boolean>({
	key: 'isFriendAtom',
	default: false,
});
