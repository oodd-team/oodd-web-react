import React from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import Card from './Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { MatchingContainer, Like } from './styles';

// 매칭 탭입니다.
const Matching: React.FC = () => {
	return (
		<MatchingContainer>
			<Like>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					Likes you 3
				</StyledText>
			</Like>
			<Swiper
				slidesPerView={1.1}
				centeredSlides={true}
				spaceBetween={0}
				modules={[Pagination]}
				className="parentSwiper"
				style={{ width: '100%' }}
			>
				<SwiperSlide>
					<Card />
				</SwiperSlide>
				<SwiperSlide>
					<Card />
				</SwiperSlide>
				<SwiperSlide>
					<Card />
				</SwiperSlide>
				<SwiperSlide>
					<Card />
				</SwiperSlide>
			</Swiper>
		</MatchingContainer>
	);
};

export default Matching;
