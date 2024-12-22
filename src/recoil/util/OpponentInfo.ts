import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import type { OtherUserDto } from '@apis/chatting/dto';

const { persistAtom } = recoilPersist();

export const OpponentInfoAtom = atom<OtherUserDto | null>({
	key: 'OpponentInfoAtom',
	default: null,
	effects_UNSTABLE: [persistAtom],
});
