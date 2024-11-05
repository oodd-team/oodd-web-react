import { atom } from 'recoil';

export const postIdAtom = atom<number>({
	key: 'postIdAtom',
	default: 0,
});

export const userIdAtom = atom<number>({
	key: 'userIdAtom',
	default: 0,
});

export const userNameAtom = atom<string>({
	key: 'userNameAtom',
	default: '',
});
