import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { OtherUser } from '../../apis/chatting/dto';

const { persistAtom } = recoilPersist();

export const OpponentInfoAtom = atom<OtherUser | null>({
	key: 'OpponentInfoAtom',
	default: null,
	effects_UNSTABLE: [persistAtom],
});
