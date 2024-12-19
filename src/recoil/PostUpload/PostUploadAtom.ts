import { atom } from 'recoil';
import type { ClothingInfo } from '@components/ClothingInfoItem/dto';
import type { PostImage } from '@apis/post/dto';

export const postImagesAtom = atom<PostImage[]>({
	key: 'imagesAtom',
	default: [],
});

export const postContentAtom = atom<string>({
	key: 'contentAtom',
	default: '',
});

export const postClothingInfosAtom = atom<ClothingInfo[]>({
	key: 'clothingInfosAtom',
	default: [],
});

export const postStyletagAtom = atom<string[]>({
	key: 'selectedStyletagAtom',
	default: [],
});

export const postIsRepresentativeAtom = atom<boolean>({
	key: 'isRepresentativeAtom',
	default: false,
});

export const modeAtom = atom({
	key: 'modeAtom',
	default: '',
});
