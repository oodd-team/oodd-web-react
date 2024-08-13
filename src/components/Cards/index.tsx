import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { CardsContainer } from './styles';
import Card from './Card';

const Cards: React.FC = () => {
	const swiperRef = useRef<any>(null); // Swiper 인스턴스 참조
	const [slidesVisibility, setSlidesVisibility] = useState([true, true, true, true]); // 각 슬라이드의 가시성을 관리

	// 현재 슬라이드를 숨기고 다음 슬라이드를 활성화하는 함수
	const handleSlideNext = (index: number) => {
		if (swiperRef.current && swiperRef.current.swiper) {
			const swiperInstance = swiperRef.current.swiper;

			// 현재 슬라이드의 가시성을 false로 변경
			const newVisibility = slidesVisibility.map((visible, i) => (i === index ? false : visible));
			setSlidesVisibility(newVisibility);

			// 다음 슬라이드로 이동하고 슬라이드 상태 업데이트
			setTimeout(() => {
				swiperInstance.slideToLoop(swiperInstance.activeIndex); // 다음 슬라이드로 이동
				swiperInstance.update(); // 슬라이드 업데이트

				// 슬라이드가 업데이트되고 나서 새롭게 활성화된 슬라이드에 active 클래스를 추가하고 스타일 적용
				const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
				if (activeSlide) {
					activeSlide.classList.add('swiper-slide-active');
					activeSlide.style.transform = 'scale(1)';
				}

				// 이전 및 다음 슬라이드를 scale(0.95)로 설정
				const prevSlide = swiperInstance.slides[swiperInstance.activeIndex - 1];
				const nextSlide = swiperInstance.slides[swiperInstance.activeIndex + 1];
				if (prevSlide) prevSlide.style.transform = 'scale(0.95)';
				if (nextSlide) nextSlide.style.transform = 'scale(0.95)';
			}, 0);
		} else {
			console.log('Swiper instance is not available');
		}
	};

	return (
		<CardsContainer>
			<Swiper
				ref={swiperRef} // Swiper 인스턴스 참조
				slidesPerView={1.1}
				centeredSlides={true}
				spaceBetween={0}
				modules={[Pagination]}
				className="parentSwiper"
				style={{ width: '100%' }}
			>
				{slidesVisibility.map((isVisible, index) => (
					<SwiperSlide key={index} style={{ display: isVisible ? 'block' : 'none' }}>
						<Card onReject={() => handleSlideNext(index)} />
					</SwiperSlide>
				))}
			</Swiper>
		</CardsContainer>
	);
};

export default Cards;
