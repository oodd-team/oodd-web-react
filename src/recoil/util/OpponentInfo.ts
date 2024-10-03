import { atom } from 'recoil';
import { Opponent } from '../../pages/Chats/RecentChat/dto';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const OpponentInfoAtom = atom<Opponent | null>({
	key: 'OpponentInfoAtom',
	default: null,
	effects_UNSTABLE: [persistAtom],
});
