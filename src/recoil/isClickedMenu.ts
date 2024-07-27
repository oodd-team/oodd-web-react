import { atom } from 'recoil';

export const isClickedMenuAtom = atom<boolean>({
	key: 'isClickedMenuAtom',
	default: false,
});
