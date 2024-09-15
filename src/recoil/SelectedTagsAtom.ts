import { atom } from 'recoil';

export const SelectedTagsAtom = atom<number[]>({
	key: 'SelectedTagsAtom',
	default: [],
});
