import { atom } from 'recoil';
import { PostSummary } from '../../apis/post/dto';

export const FeedsAtom = atom<PostSummary[] | []>({
	key: 'FeedsAtom',
	default: [],
});
