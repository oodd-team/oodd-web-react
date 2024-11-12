import React from 'react';
import { StyledText } from '../Text/StyledText';
import x from '../../assets/default/x.svg';
import right from '../../assets/arrow/right.svg';
import { ClothingInfoItemProps } from './dto';
import { ClothingInfoItemContainer, ClothingInfoLeft, ClothingInfoRight, StyledTextClipped } from './styles';

const ClothingInfoItem: React.FC<ClothingInfoItemProps> = ({ clothingObj, onDelete, hasRightMargin = false }) => {
	const handleClick = () => {
		if (clothingObj.url) {
			window.location.href = clothingObj.url;
		}
	};

	return (
		<ClothingInfoItemContainer style={{ marginRight: hasRightMargin ? '0.75rem' : '0' }}>
			<ClothingInfoLeft onClick={handleClick}>
				<img src={clothingObj.imageUrl} alt="ClothingInfoImg" />
				<div className="infoDetail">
					<StyledText className="brand" $textTheme={{ style: 'body2-bold', lineHeight: 2 }}>
						{clothingObj.brand}
					</StyledText>
					<StyledTextClipped className="model" $textTheme={{ style: 'caption1-regular', lineHeight: 1 }}>
						{clothingObj.model}
					</StyledTextClipped>
				</div>
			</ClothingInfoLeft>
			<ClothingInfoRight>
				{onDelete ? <img src={x} onClick={() => onDelete(clothingObj)} /> : <img src={right} alt="right" />}
			</ClothingInfoRight>
		</ClothingInfoItemContainer>
	);
};

export default ClothingInfoItem;
