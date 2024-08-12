import { atom } from 'recoil';
import { Opponent } from '../pages/Chats/RecentChat/dto';

export const OpponentInfoAtom = atom<Opponent | null>({
	key: 'OpponentInfoAtom',
	default: null,
});
