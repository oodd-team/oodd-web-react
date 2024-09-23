import { atom } from 'recoil';
import { UserInfoProps } from '../pages/ProfileViewer/dto';
import { ClothingInfo, Styletag } from '../pages/PostUpload/dto';

export const userDetailsState = atom<UserInfoProps | null>({
	key: 'userDetailsState',
	default: null,
});

export const isBottomSheetOpenState = atom<boolean>({
	key: 'isBottomSheetOpenState',
	default: false,
});

export const friendState = atom<boolean>({
	key: 'friendState',
	default: false,
});

export const postImagesState = atom<string[]>({
	key: 'selectedImagesState',
	default: [],
});

export const postContentState = atom<string>({
	key: 'contentState',
	default: '',
});

export const postClothingInfosState = atom<ClothingInfo[]>({
	key: 'clothingInfosState',
	default: [],
});

export const postStyletagState = atom<Styletag | null>({
	key: 'selectedStyletagState',
	default: null,
});

export const postIsRepresentativeState = atom<boolean>({
	key: 'isRepresentativeState',
	default: false,
});
