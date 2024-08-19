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

	// 매칭 요청 거절 시 거절한 요청을 제거하는 함수
	const handleSlideNext = (index: number) => {
		if (swiperRef.current && swiperRef.current.swiper) {
			// 해당 요청을 리스트에서 제거
			const newSlidesVisibility = slidesVisibility.filter((_, i) => i !== index);
			setSlidesVisibility(newSlidesVisibility);
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
				{slidesVisibility.map((_, index) => (
					<SwiperSlide key={index}>
						<Card onReject={() => handleSlideNext(index)} />
					</SwiperSlide>
				))}
			</Swiper>
		</CardsContainer>
	);
};

export default Cards;
