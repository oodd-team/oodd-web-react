import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { SwiperContainer, ImageWrapper, StyledNavigation, StyledPagination } from './styles';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import picture2 from '../../assets/picture2.svg';
import { ImageSwiperProps } from '../dto';

SwiperCore.use([Navigation, Pagination]);

const ImageSwiper: React.FC<ImageSwiperProps> = ({ images }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<SwiperContainer>
			<Swiper
				spaceBetween={10}
				slidesPerView="auto"
				centeredSlides={true}
				navigation={{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}}
				pagination={{
					el: '.swiper-pagination',
					type: 'custom',
					renderCustom: (swiper, current, total) => {
						return `
							<div class="swiper-pagination-custom">
								<img src="${picture2}" alt="Pagination Icon" />
								<span>${current}/${total}</span>
							</div>`;
					},
				}}
				onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
				onSwiper={(swiper) => setCurrentSlide(swiper.activeIndex)}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index} className={currentSlide === index ? 'main-slide' : ''}>
						<ImageWrapper>
							<img src={image} alt={`Selected ${index}`} />
						</ImageWrapper>
					</SwiperSlide>
				))}
				<StyledNavigation className="swiper-button-prev" />
				<StyledNavigation className="swiper-button-next" />
				<StyledPagination className="swiper-pagination" />
			</Swiper>
		</SwiperContainer>
	);
};

export default ImageSwiper;
