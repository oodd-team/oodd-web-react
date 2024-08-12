import { atom } from 'recoil';

export const MockUserIdAtom = atom<number>({
	key: 'MockUserId',
	default: 1,
});
