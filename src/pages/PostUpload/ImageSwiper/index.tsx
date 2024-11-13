import React, { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SwiperContainer, ImageWrapper, StyledNavigation, StyledPagination } from './styles';

import PhotoWhite from '../../../assets/default/photo-white.svg';

import { ImageSwiperProps } from '../dto';

const ImageSwiper: React.FC<ImageSwiperProps> = ({ images }) => {
	const swiperRef = useRef<SwiperRef | null>(null);

	return (
		<SwiperContainer>
			<Swiper
				className="upload-swiper"
				ref={swiperRef}
				spaceBetween={5}
				slidesPerView="auto"
				centeredSlides={true}
				navigation={{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}}
				pagination={{
					el: '.swiper-pagination',
					type: 'custom',
					renderCustom: (_, current, total) => {
						return `
							<div class="swiper-pagination-custom">
								<img src="${PhotoWhite}" alt="Pagination Icon" />
								<span>${current}/${total}</span>
							</div>`;
					},
				}}
				modules={[Navigation, Pagination]}
				onSlideChange={(swiper) => {
					swiper.slides.forEach((slide) => {
						slide.classList.remove('swiper-slide-prev', 'swiper-slide-next', 'swiper-slide-active');
					});

					const activeSlide = swiper.slides[swiper.activeIndex];
					activeSlide.classList.add('swiper-slide-active');
					const prevSlide = activeSlide.previousElementSibling;
					if (prevSlide) prevSlide.classList.add('swiper-slide-prev');
					const nextSlide = activeSlide.nextElementSibling;
					if (nextSlide) nextSlide.classList.add('swiper-slide-next');
				}}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
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
