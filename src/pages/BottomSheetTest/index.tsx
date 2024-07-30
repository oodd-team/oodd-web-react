import React, { useState } from 'react';
import BottomSheet from '../../components/BottomSheet';
import { OODDFrame } from '../../components/Frame/Frame';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import Items from './Items';

const BottomSheetTest: React.FC = () => {
	const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isOpenBottomSheet,
		isBackgroundDimmed: true,
		Component: Items,
		onCloseBottomSheet: () => {
			setIsOpenBottomSheet(false);
		},
	};

	return (
		<OODDFrame>
			바텀시트 사용 예입니다 확인 후 폴더를 삭제해 주세요
			<BottomSheet {...bottomSheetProps} />
			<button
				style={{ padding: '10px', border: '1px solid gray' }}
				onClick={() => {
					setIsOpenBottomSheet(true);
				}}
			>
				누르면 바텀시트가 올라옵니다
			</button>
		</OODDFrame>
	);
};

export default BottomSheetTest;
