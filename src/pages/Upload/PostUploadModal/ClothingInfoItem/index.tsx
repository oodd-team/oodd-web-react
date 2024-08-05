import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import close from '../../assets/close2.svg';
import { ClothingInfoItemProps } from '../dto';
import { ClothingInfoItemContainer } from './styles';

const ClothingInfoItem: React.FC<ClothingInfoItemProps> = ({ clothingObj, onDelete }) => {
	return (
		<ClothingInfoItemContainer>
			<img src={clothingObj.image} />
			<div className="infoContainer">
				<StyledText className="brand" $textTheme={{ style: 'body2-regular', lineHeight: 1.2 }}>
					{clothingObj.brand}
				</StyledText>
				<StyledText className="detail" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
					{clothingObj.model}
				</StyledText>
			</div>
			<button onClick={() => onDelete(clothingObj)}>
				<img src={close} />
			</button>
		</ClothingInfoItemContainer>
	);
};

export default ClothingInfoItem;
