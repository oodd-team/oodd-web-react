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

const BottomSheetTest: React.FC = () => {
	const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
	const [isOpenBottomSheet2, setIsOpenBottomSheet2] = useState(false);

	// 바텀시트 내부 컴포넌트에 전달할 props가 없는 경우
	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isOpenBottomSheet,
		isBackgroundDimmed: true,
		Component: Items,
		onCloseBottomSheet: () => {
			setIsOpenBottomSheet(false);
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
				},
				icon: Pin,
			},
		],
		marginBottom: '50px',
	};

	// 바텀시트 내부 컴포넌트에 전달할 props가 있는 경우
	const bottomSheet2Props: BottomSheetProps = {
		isOpenBottomSheet: isOpenBottomSheet2,
		isBackgroundDimmed: true,
		Component: BottomSheetMenu, // 렌더링하고자 하는 컴포넌트와
		componentProps: bottomSheetMenuProps, // 해당 컴포넌트의 props를 작성
		onCloseBottomSheet: () => {
			setIsOpenBottomSheet2(false);
		},
	};

	return (
		<OODDFrame>
			바텀시트 사용 예입니다 확인 후 폴더를 삭제해 주세요
			<BottomSheet {...bottomSheetProps} />
			<BottomSheet {...bottomSheet2Props} />
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
					setIsOpenBottomSheet2(true);
				}}
			>
				BottomSheetMenu 사용 예입니다
			</button>
		</OODDFrame>
	);
};

export default BottomSheetTest;
