import { atom } from 'recoil';
import { UserInfoProps } from '../pages/ProfileViewer/dto';
import { mockUserData } from '../pages/ProfileViewer/MocData';

export const userDetailsState = atom<UserInfoProps | null>({
    key: 'userDetailsState',
    default: null,
});

export const nicknameState = atom<string>({
    key: 'nicknameState',
    default: '',
});

export const isBottomSheetOpenState = atom<boolean>({
    key: 'isBottomSheetOpenState',
    default: false,
});

export const requestMessageState = atom<string>({
    key: 'requestMessageState',
    default: `${mockUserData.userId}님에게 대표 OOTD와 함께 전달될 한 줄 메세지를 보내보세요!`,
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