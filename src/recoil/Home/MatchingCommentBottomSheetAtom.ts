import { atom } from 'recoil';
import { MatchingInfoDto } from '../../pages/Home/dto';

export const IsMatchingCommentBottomSheetOpenAtom = atom<boolean>({
	key: 'isMatchingCommentBottomSheetOpenAtom',
	default: false,
});

export const MatchingInfoAtom = atom<MatchingInfoDto | null>({
	key: 'matchingInfoAtom',
	default: null,
});
