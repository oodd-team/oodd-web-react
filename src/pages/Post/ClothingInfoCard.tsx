import React from 'react';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import {
	NextBtn,
	ClothingInfoCardContainer,
	ClothingInfoImg,
	ClothingInfoDetail,
	StyledTextClipped,
	ClothingInfoLeft,
} from './styles';
import nextBtn from './../../assets/Post/next.svg';
import { ClothingInfoCardProps } from './dto';

const ClothingInfoCard: React.FC<ClothingInfoCardProps> = ({ imageUrl, brand, model, url }) => {
	const handleClick = () => {
		if (url) {
			window.location.href = url;
		}
	};

	return (
		<ClothingInfoCardContainer onClick={handleClick}>
			<ClothingInfoLeft>
				<ClothingInfoImg src={imageUrl} alt="ClothingInfoImg" />
				<ClothingInfoDetail>
					<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.black}>
						{brand}
					</StyledText>
					<StyledTextClipped $textTheme={{ style: 'body6-light', lineHeight: 1.2 }} color={theme.colors.gray4}>
						{model}
					</StyledTextClipped>
				</ClothingInfoDetail>
			</ClothingInfoLeft>
			<NextBtn>
				<img src={nextBtn} alt="nextBtn" />
			</NextBtn>
		</ClothingInfoCardContainer>
	);
};

export default ClothingInfoCard;
