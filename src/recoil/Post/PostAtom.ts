import { atom } from 'recoil';
import { User } from '../../apis/post/dto';

export const postIdAtom = atom<number>({
	key: 'postIdAtom',
	default: 0,
});

export const userAtom = atom<User>({
	key: 'userAtom',
	default: {
		userId: 0,
		nickname: '알 수 없음',
		profilePictureUrl: '',
	},
});

export const isPostRepresentativeAtom = atom<boolean>({
	key: 'isPostRepresentativeAtom',
	default: false,
});
