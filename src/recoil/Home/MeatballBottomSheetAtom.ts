import { atom } from 'recoil';
import { PostReportDto } from '../../components/PostBottomSheets/dto';

export const IsMeatballBottomSheetOpenAtom = atom<boolean>({
	key: 'IsMeatballBottomSheetOpenAtom',
	default: false,
});

export const IsReportBottomSheetOpenAtom = atom<boolean>({
	key: 'IsReportBottomSheetOpenAtom',
	default: false,
});

export const IsReportSuccessModalOpenAtom = atom<boolean>({
	key: 'IsReportSuccessModalOpenAtom',
	default: false,
});

export const IsReportFailModalOpenAtom = atom<boolean>({
	key: 'IsReportFailModalOpenAtom',
	default: false,
});

export const PostReportAtom = atom<PostReportDto | null>({
	key: 'PostReportAtom',
	default: null,
});
