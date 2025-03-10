import { useNavigate } from 'react-router-dom';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import theme from '@styles/theme';

import defaultProfile from '@assets/default/defaultProfile.svg';

import { StyledText } from '@components/Text/StyledText';

import type { CardProps } from './dto';

import { CardLayout, OOTDImgBackground, OOTDImgBox, ProfileContainer, ProfileImgBox, ProfileInfo } from './styles';

const Card: React.FC<CardProps> = ({ requester }) => {
	const nav = useNavigate();

	const handleUserClick = () => {
		nav(`/profile/${requester.id}`);
	};

	return (
		<CardLayout>
			<ProfileContainer>
				<ProfileImgBox onClick={handleUserClick}>
					<img src={requester.profilePictureUrl || defaultProfile} alt="profile" />
				</ProfileImgBox>
				<ProfileInfo>
					<StyledText
						$textTheme={{ style: 'body2-medium' }}
						color={theme.colors.text.primary}
						onClick={handleUserClick}
					>
						{requester.nickname || '알수없음'}
					</StyledText>
					<div className="row-flex">
						{requester.representativePost.styleTags.map((tag, index) => (
							<div className="row-flex" key={tag}>
								<StyledText $textTheme={{ style: 'caption2-regular' }} color={theme.colors.gray[600]}>
									{tag}
								</StyledText>
								{index < requester.representativePost.styleTags.length - 1 && (
									<StyledText $textTheme={{ style: 'caption2-regular' }} color={theme.colors.gray[200]}>
										,&nbsp;
									</StyledText>
								)}
							</div>
						))}
					</div>
				</ProfileInfo>
			</ProfileContainer>
			<OOTDImgBox>
				<Swiper
					direction="vertical"
					slidesPerView={1}
					effect="slide"
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="childSwiper"
				>
					{requester.representativePost.postImages.map((postImage) => (
						<SwiperSlide key={postImage.url}>
							<img src={postImage.url} alt="OOTD" className="slide-image-small" />
							<div className="blur"></div>
							<OOTDImgBackground $src={postImage.url} />
						</SwiperSlide>
					))}
				</Swiper>
			</OOTDImgBox>
		</CardLayout>
	);
};

export default Card;
