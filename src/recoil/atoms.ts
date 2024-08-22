import { atom } from 'recoil';
import { UserInfoProps } from '../pages/ProfileViewer/dto';

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