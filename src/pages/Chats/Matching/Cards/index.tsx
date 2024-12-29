import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { CardsContainer } from './styles';
import Card from './Card/index';
import { getMatchingListApi } from '@apis/matching';
import type { MatchingDto } from '@apis/matching/dto';
import type { CardsProps } from './dto';

const Cards: React.FC<CardsProps> = ({ decreaseMatchingCount }) => {
	const [matchings, setMatchings] = useState<MatchingDto[]>([]);
	const swiperRef = useRef<SwiperRef | null>(null);

	// 매칭 요청 거절 시 거절한 요청을 제거하는 함수
	const removeRejectedMatching = (index: number) => {
		if (swiperRef.current && swiperRef.current.swiper) {
			// 해당 요청을 리스트에서 제거
			const remainMatchings = matchings.filter((_, i) => i !== index);
			setMatchings(remainMatchings);
			decreaseMatchingCount();
		} else {
			console.log('Swiper instance is not available');
		}
	};

	// 매칭 리스트 조회 api
	const getMatchingList = async () => {
		const response = await getMatchingListApi();

		setMatchings(response.data.matching);
	};

	useEffect(() => {
		getMatchingList();
	}, []);

	return (
		<CardsContainer>
			<Swiper
				ref={swiperRef} // Swiper 인스턴스 참조
				slidesPerView={1.1}
				centeredSlides={true}
				spaceBetween={0}
				modules={[Pagination]}
				className="parentSwiper"
			>
				{matchings.map((matching, index) => (
					<SwiperSlide key={matching.id}>
						<Card
							matching={matching} // 데이터를 Card 컴포넌트에 전달
							removeRejectedMatching={() => removeRejectedMatching(index)}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</CardsContainer>
	);
};

export default Cards;
