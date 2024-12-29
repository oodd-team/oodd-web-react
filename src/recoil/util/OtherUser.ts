import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import type { OtherUserDto } from '@apis/chatting/dto';

const { persistAtom } = recoilPersist();

export const OtherUserAtom = atom<OtherUserDto | null>({
	key: 'OtherUserAtom',
	default: null,
	effects_UNSTABLE: [persistAtom],
});
