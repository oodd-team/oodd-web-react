import React from 'react';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { NextBtn, ProductCardContainer, ProductImg, ProductInfo, ProductLeft } from './styles';
import nextBtn from './../../assets/Post/next.svg';

interface ProductCardProps {
  brandName: string;
  modelName: string;
  productImgSrc: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ brandName, modelName, productImgSrc }) => {
  return (
    <ProductCardContainer>
      <ProductLeft>
        <ProductImg src={productImgSrc} alt="productImg" />
        <ProductInfo>
          <StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.black}>
            {brandName}
          </StyledText>
          <StyledText $textTheme={{ style: 'body6-light', lineHeight: 1.2 }} color={theme.colors.gray4}>
            {modelName}
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
