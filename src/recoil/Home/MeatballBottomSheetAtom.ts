import { atom } from 'recoil';
import { PostReportDto } from '../../pages/Home/BottomSheets/dto';

export const IsOpenMeatballBottomSheetAtom = atom<boolean>({
	key: 'IsOpenMeatballBottomSheetAtom',
	default: false,
});

export const IsOpenReportBottomSheetAtom = atom<boolean>({
	key: 'IsOpenReportBottomSheetAtom',
	default: false,
});

export const IsOpenReportSuccessModalAtom = atom<boolean>({
	key: 'IsOpenReportSuccessModalAtom',
	default: false,
});

export const IsOpenReportFailModalAtom = atom<boolean>({
	key: 'IsOpenReportFailModalAtom',
	default: false,
});

export const PostReportAtom = atom<PostReportDto | null>({
	key: 'PostReportAtom',
	default: null,
});
