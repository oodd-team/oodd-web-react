import { atom } from 'recoil';

export const MockUserId = atom<number>({
	key: 'MockUserId',
	default: 1,
});
