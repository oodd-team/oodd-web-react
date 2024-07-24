import React, { useState } from 'react';
import { SheetContainer, SheetContent, Input, SearchResultContainer } from './styles';
import { StyledText } from '../../../../components/Text/StyledText';

interface ClothingInfo {
	brand: string;
	model: string;
	url: string;
}
interface BottomSheetProps {
	onClose: () => void;
	clothingInfos: ClothingInfo[];
	onSelectClothingInfos: (clothingInfos: ClothingInfo[]) => void;
}

const ClothingInfoBottomSheet: React.FC<BottomSheetProps> = ({ onClose, clothingInfos, onSelectClothingInfos }) => {
	const [clothings, setClothings] = useState<ClothingInfo[]>(clothingInfos);

	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		onSelectClothingInfos([...clothings, { brand: 'Nike', model: 'SDXAZDSF', url: 'nike.com' }]);
		onClose();
	};

	return (
		<SheetContainer>
			<SheetContent>
				<div className="input_container">
					<Input placeholder="브랜드명, 모델명, 모델번호, URL 등" />
					<StyledText onClick={handleBackgroundClick} $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
						취소
					</StyledText>
				</div>
				<SearchResultContainer></SearchResultContainer>
			</SheetContent>
		</SheetContainer>
	);
};

export default ClothingInfoBottomSheet;
