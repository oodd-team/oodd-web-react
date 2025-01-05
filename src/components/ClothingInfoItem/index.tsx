import Right from '@assets/arrow/right.svg';
import X from '@assets/default/x.svg';

import { StyledText } from '@components/Text/StyledText';

import type { ClothingInfoItemProps } from './dto';

import { ClothingInfoItemContainer, ClothingInfoLeft, ClothingImage, ClothingInfoRight, ClothingModel } from './styles';

const ClothingInfoItem: React.FC<ClothingInfoItemProps> = ({ clothingObj, onDelete }) => {
	const handleClick = () => {
		if (clothingObj.url) {
			window.location.href = clothingObj.url;
		}
	};

	return (
		<ClothingInfoItemContainer>
			<ClothingInfoLeft onClick={handleClick}>
				<ClothingImage>
					<img src={clothingObj.imageUrl} alt="ClothingImg" />
				</ClothingImage>
				<div className="infoDetail">
					<StyledText className="brand" $textTheme={{ style: 'body2-bold' }}>
						{clothingObj.brandName}
					</StyledText>
					<ClothingModel className="model" $textTheme={{ style: 'body4-light' }}>
						{clothingObj.modelName}
					</ClothingModel>
				</div>
			</ClothingInfoLeft>
			<ClothingInfoRight>
				{onDelete ? <img src={X} onClick={() => onDelete(clothingObj)} /> : <img src={Right} alt="right" />}
			</ClothingInfoRight>
		</ClothingInfoItemContainer>
	);
};

export default ClothingInfoItem;
