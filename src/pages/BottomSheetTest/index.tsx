import React, { useState } from 'react';
import BottomSheet from '../../components/BottomSheet';
import { OODDFrame } from '../../components/Frame/Frame';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import Items from './Items';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';
import Exit from '../../assets/BottomSheetMenu/Edit.svg';
import Delete from '../../assets/BottomSheetMenu/Delete.svg';
import Pin from '../../assets/BottomSheetMenu/Pin.svg';
import Comment from '../../components/Comment';
import { CommentProps } from '../../components/Comment/dto';

const BottomSheetTest: React.FC = () => {
	const username = 'IDID';
	const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
	const [isOpenBottomSheet0, setIsOpenBottomSheet0] = useState(false);
	const [isOpenBottomSheet2, setIsOpenBottomSheet2] = useState(false);
	const [isOpenBottomSheet3, setIsOpenBottomSheet3] = useState(false);

	// 바텀시트 내부 컴포넌트에 전달할 props가 없는 경우
	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isOpenBottomSheet,
		isHandlerVisible: true,
		isBackgroundDimmed: true,
		Component: Items,
		onCloseBottomSheet: () => {
			setIsOpenBottomSheet(false);
		},
	};

	// 바텀시트 내부에 핸들러가 없는 경우
	const bottomSheet0Props: BottomSheetProps = {
		isOpenBottomSheet: isOpenBottomSheet0,
		isHandlerVisible: false,
		isBackgroundDimmed: true,
		Component: Items,
		onCloseBottomSheet: () => {
			setIsOpenBottomSheet0(false);
		},
	};

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '차단하기',
				action: () => {
					setIsOpenBottomSheet2(false);
				},
				icon: Exit,
			},
			{
				text: '삭제하기',
				action: () => {
					setIsOpenBottomSheet2(false);
				},
				icon: Delete,
			},
			{
				text: '고정하기',
				action: () => {
					setIsOpenBottomSheet2(false);
					// icon이 없는 사용 예 ex. 신고하기 - 신고 사유
				},
			},
		],
		marginBottom: '50px',
	};

	// 바텀시트 내부 컴포넌트에 전달할 props가 있는 경우
	const bottomSheet2Props: BottomSheetProps = {
		isOpenBottomSheet: isOpenBottomSheet2,
		isHandlerVisible: true,
		isBackgroundDimmed: true,
		Component: BottomSheetMenu, // 렌더링하고자 하는 컴포넌트와
		componentProps: bottomSheetMenuProps, // 해당 컴포넌트의 props를 작성
		onCloseBottomSheet: () => {
			setIsOpenBottomSheet2(false);
		},
	};

	const commentProps: CommentProps = {
		content: `${username}님에게 대표 OOTD와 함께 전달될\n한줄 메시지를 보내보세요!`,
		sendComment: (comment) => {
			console.log(`api에 ${comment} 전달`);
		},
	};

	const bottomSheet3Props: BottomSheetProps = {
		isOpenBottomSheet: isOpenBottomSheet3,
		isHandlerVisible: true,
		isBackgroundDimmed: true,
		Component: Comment,
		componentProps: commentProps,
		onCloseBottomSheet: () => {
			setIsOpenBottomSheet3(false);
		},
	};

	return (
		<OODDFrame>
			바텀시트 사용 예입니다 확인 후 폴더를 삭제해 주세요
			<BottomSheet {...bottomSheetProps} />
			<BottomSheet {...bottomSheet0Props} />
			<BottomSheet {...bottomSheet2Props} />
			<BottomSheet {...bottomSheet3Props} />
			<button
				style={{ padding: '10px', margin: '10px', border: '1px solid gray' }}
				onClick={() => {
					setIsOpenBottomSheet(true);
				}}
			>
				누르면 바텀시트가 올라옵니다
			</button>
			<button
				style={{ padding: '10px', margin: '10px', border: '1px solid gray' }}
				onClick={() => {
					setIsOpenBottomSheet0(true);
				}}
			>
				핸들러가 없는 바텀시트입니다
			</button>
			<button
				style={{ padding: '10px', margin: '10px', border: '1px solid gray' }}
				onClick={() => {
					setIsOpenBottomSheet2(true);
				}}
			>
				BottomSheetMenu 사용 예입니다
			</button>
			<button
				style={{ padding: '10px', margin: '10px', border: '1px solid gray' }}
				onClick={() => {
					setIsOpenBottomSheet3(true);
				}}
			>
				Comment 사용 예입니다
			</button>
		</OODDFrame>
	);
};

export default BottomSheetTest;
