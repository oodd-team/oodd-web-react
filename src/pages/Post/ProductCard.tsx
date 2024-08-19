import React from 'react';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { NextBtn, ProductCardContainer, ProductImg, ProductInfo, ProductLeft } from './styles';
import productImg from './../../assets/Post/productImg.svg';
import nextBtn from './../../assets/Post/next.svg';

const ProductCard: React.FC = () => {
	return (
		<ProductCardContainer>
			<ProductLeft>
				<ProductImg src={productImg} />
				<ProductInfo>
					<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.black}>
						브랜드명
					</StyledText>
					<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1.2 }} color={theme.colors.gray4}>
						모델명/모델번호/URL...
					</StyledText>
				</ProductInfo>
			</ProductLeft>
			<NextBtn>
				<img src={nextBtn} alt="nextBtn" />
			</NextBtn>
		</ProductCardContainer>
	);
};

export default ProductCard;
