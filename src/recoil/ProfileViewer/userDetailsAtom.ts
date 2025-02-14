import { atom } from 'recoil';

import imageBasic from '@assets/default/defaultProfile.svg';

import type { UserInfoData } from '@apis/user/dto';

type BasicUserInfo = Pick<UserInfoData, 'id' | 'nickname' | 'bio' | 'isFriend' | 'profilePictureUrl'>;

export const UserInfoAtom = atom<BasicUserInfo | null>({
	key: 'UserInfoAtom',
	default: {
		id: -1,
		nickname: '알 수 없음',
		bio: '',
		isFriend: false,
		profilePictureUrl: imageBasic,
	},
});

export const isFriendAtom = atom<boolean>({
	key: 'isFriendAtom',
	default: false,
});
