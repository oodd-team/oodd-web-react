import React from 'react';
import { OODDFrame } from '../../components/Frame/Frame';
import PostTopBar from './PostTopBar';
import profileImg from './../../assets/Post/profileImg.svg';
import postImg1 from './../../assets/Post/postImg1.svg';
import more from './../../assets/Post/more.svg';
import { StyledText } from '../../components/Text/StyledText';
import { MoreBtn, PostImg, PostInfo, PostText, PostWrapper, Products, UserInfo, UserName, UserProfile } from './styles';
import theme from '../../styles/theme';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

// Post 페이지입니다.
const Post: React.FC = () => {
	const nav = useNavigate();

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
				<PostImg src={postImg1} alt="postImg1" />
				<Products>
					<ProductCard /> <ProductCard /> <ProductCard /> <ProductCard />
				</Products>
			</PostWrapper>
		</OODDFrame>
	);
};

export default Post;
