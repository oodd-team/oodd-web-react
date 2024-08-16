import { atom } from 'recoil';
import { UserInfoProps } from '../pages/ProfileViewer/dto';

export const userDetailsState = atom<UserInfoProps | null>({
    key: 'userDetailsState',
    default: null,
});

export const userIdState = atom({
    key: 'userIdState',
    default: null,
});


export const tokenState = atom({
    key: 'tokenState',
    default: null,
});

export const isBottomSheetOpenState = atom<boolean>({
    key: 'isBottomSheetOpenState',
    default: false,
});

export const interestedState = atom<boolean>({
    key: 'interestedState',
    default: false,
});

export const friendState = atom<boolean>({
    key: 'friendState',
    default: false,
});

export const authTokenState = atom({
    key: 'authTokenState', // 유니크한 key를 지정합니다.
    default: '', // 기본값을 빈 문자열로 설정합니다.
});