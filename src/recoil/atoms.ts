import { atom } from 'recoil';
import { UserInfoProps } from '../pages/ProfileViewer/dto';

export const userDetailsState = atom<UserInfoProps | null>({
    key: 'userDetailsState',
    default: null,
});

export const nicknameState = atom<string>({
    key: 'nicknameState',
    default: '',
});