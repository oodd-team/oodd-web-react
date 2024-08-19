import React from 'react';
import { OODDFrame } from '../../components/Frame/Frame';
import PostTopBar from './PostTopBar';
import profileImg from './../../assets/Post/profileImg.svg';
import postImg1 from './../../assets/Post/postImg1.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import more from './../../assets/Post/more.svg';
import { StyledText } from '../../components/Text/StyledText';
import { MoreBtn, PostImg, PostInfo, PostText, PostWrapper, Products, UserInfo, UserName, UserProfile } from './styles';
import theme from '../../styles/theme';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import productImg from './../../assets/Post/productImg.svg';

// Post 페이지입니다.
const Post: React.FC = () => {
	const nav = useNavigate();

	const productData = [
		{ id: 1, brandName: '브랜드1', modelName: '모델1/모델번호/URL...', productImgSrc: productImg },
		{ id: 2, brandName: '브랜드2', modelName: '모델2/모델번호/URL...', productImgSrc: productImg },
		{ id: 3, brandName: '브랜드3', modelName: '모델3/모델번호/URL...', productImgSrc: productImg },
		{ id: 4, brandName: '브랜드4', modelName: '모델4/모델번호/URL...', productImgSrc: productImg },
	];

	const postImages = [postImg1, postImg1, postImg1, postImg1];

	return (
		<OODDFrame>
			<PostTopBar />
			<PostWrapper>
				<PostInfo>
					<UserInfo onClick={() => nav('/users/:userId')}>
						<UserProfile>
							<img src={profileImg} alt="profileImg" />
						</UserProfile>
						<UserName>
							<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
								IDID
							</StyledText>
						</UserName>
					</UserInfo>
					<MoreBtn>
						<img src={more} alt="more" />
					</MoreBtn>
				</PostInfo>
				<PostText>
					<StyledText
						$textTheme={{ style: 'body6-light', lineHeight: 1.2 }}
						color={theme.colors.black}
						style={{ opacity: '50%' }}
					>
						Text~~~~~~~~~~~~~~~~~~~~~~~ ...Text~~~~~~~~~~~~~~~~~~~~~~~ ...Text~~~~~~~~~~~~~~~~~~~~~~~ ...
					</StyledText>
				</PostText>
				<PostImg>
					<Swiper
						modules={[Pagination, Navigation]}
						slidesPerView={1}
						pagination={{ clickable: true }}
						navigation
						className="postSwiper"
					>
						{postImages.map((image, index) => (
							<SwiperSlide key={index}>
								<img src={image} alt="postImg" style={{ width: '100%', height: 'auto' }} />
							</SwiperSlide>
						))}
					</Swiper>
				</PostImg>
				<Products>
					{productData.map((product) => (
						<ProductCard
							key={product.id}
							brandName={product.brandName}
							modelName={product.modelName}
							productImgSrc={product.productImgSrc}
						/>
					))}
				</Products>
			</PostWrapper>
		</OODDFrame>
	);
};

export default Post;
