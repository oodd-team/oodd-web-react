import React from 'react';
import { StyledText } from '../Text/StyledText';
import close from '../../assets/Upload/close2.svg';
import next from '../../assets/Post/next.svg';
import { ClothingInfoItemProps } from './dto';
import { ClothingInfoItemContainer, ClothingInfoLeft, ClothingInfoRight, StyledTextClipped } from './styles';

const ClothingInfoItem: React.FC<ClothingInfoItemProps> = ({ clothingObj, onDelete, hasRightMargin = false }) => {
	const handleClick = () => {
		if (clothingObj.url) {
			window.location.href = clothingObj.url;
		}
	};

	return (
		<ClothingInfoItemContainer onClick={handleClick} style={{ marginRight: hasRightMargin ? '0.75rem' : '0' }}>
			<ClothingInfoLeft>
				<img src={clothingObj.imageUrl} alt="ClothingInfoImg" />
				<div className="infoDetail">
					<StyledText className="brand" $textTheme={{ style: 'headline2-bold', lineHeight: 2 }}>
						{clothingObj.brand}
					</StyledText>
					<StyledTextClipped className="model" $textTheme={{ style: 'caption2-regular', lineHeight: 1 }}>
						{clothingObj.model}
					</StyledTextClipped>
				</div>
			</ClothingInfoLeft>
			<ClothingInfoRight>
				{onDelete ? <img src={close} onClick={() => onDelete(clothingObj)} /> : <img src={next} alt="next" />}
			</ClothingInfoRight>
		</ClothingInfoItemContainer>
	);
};

export default ClothingInfoItem;
