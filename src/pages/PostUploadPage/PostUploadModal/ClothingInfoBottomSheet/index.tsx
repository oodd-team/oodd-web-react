import React from 'react';
import { SheetContainer, SheetContent, Input, SearchResultContainer } from './styles';

interface BottomSheetProps {
	onClose: () => void;
}

const ClothingInfoBottomSheet: React.FC<BottomSheetProps> = ({ onClose }) => {
	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		onClose();
	};

	return (
		<SheetContainer>
			<SheetContent>
				<div>
					<Input placeholder="브랜드명, 모델명, 모델번호, URL 등" />
					<span onClick={handleBackgroundClick}>취소</span>
				</div>
				<SearchResultContainer></SearchResultContainer>
			</SheetContent>
		</SheetContainer>
	);
};

export default ClothingInfoBottomSheet;
