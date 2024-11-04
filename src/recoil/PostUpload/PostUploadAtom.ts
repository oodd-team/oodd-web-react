import { atom } from 'recoil';
import { ClothingInfo } from '../../components/ClothingInfoItem/dto';
import { Styletag } from '../../pages/PostUpload/dto';

export const postImagesAtom = atom<string[]>({
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

export const postStyletagAtom = atom<Styletag | null>({
	key: 'selectedStyletagAtom',
	default: null,
});

export const postIsRepresentativeAtom = atom<boolean>({
	key: 'isRepresentativeAtom',
	default: false,
});
