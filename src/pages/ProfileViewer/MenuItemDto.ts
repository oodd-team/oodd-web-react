import BlockIcon from '../../assets/default/block.svg';
import ReportIcon from '../../assets/default/report.svg';
import { UserInfoProps } from './UserInfoProps';

export const mainMenuItems = (
	userDetails: UserInfoProps,
	handleOpenBottomSheet: (type: string) => void,
	handleOpenConfirmationModal: () => void,
) => {
	const BottomsheetsText = userDetails.status === 'blocked' ? '차단 해제하기' : '차단하기';

	return [
		{
			text: '신고하기',
			action: () => handleOpenBottomSheet('report'),
			icon: ReportIcon,
		},
		{
			text: BottomsheetsText,
			action: () => handleOpenConfirmationModal(),
			icon: BlockIcon,
		},
	];
};

export const reportMenuItems = (handleDirectInput: () => void, Report: (text: string) => void) => [
	{
		text: '불법정보',
		action: () => {
			console.log('Report 1');
			Report('불법정보');
		},
	},
	{
		text: '욕설/인신공격',
		action: () => {
			console.log('Report 2');
			Report('욕설/인신공격');
		},
	},
	{
		text: '음란성/선정성',
		action: () => {
			console.log('Report 3');
			Report('음란성/선정성');
		},
	},
	{
		text: '영리목적/홍보성',
		action: () => {
			console.log('Report 4');
			Report('영리목적/홍보성');
		},
	},
	{
		text: '개인정보노출',
		action: () => {
			console.log('Report 5');
			Report('개인정보노출');
		},
	},
	{
		text: '같은 내용의 반복 게시(도배)',
		action: () => {
			console.log('Report 6');
			Report('같은 내용의 반복 게시(도배)');
		},
	},
	{
		text: '직접입력',
		action: () => {
			handleDirectInput();
			// 직접 입력 처리 후 Report 호출이 필요할 수 있음
		},
	},
];
