import { atom } from 'recoil';
import { FeedProps } from '../pages/Home/OOTD/dto';

export const FeedsAtom = atom<FeedProps[] | []>({
	key: 'FeedsAtom',
	default: [],
});
