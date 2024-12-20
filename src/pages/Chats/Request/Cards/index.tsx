import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { CardsContainer } from './styles';
import Card from './Card';
import { getMatchingListApi } from '../../../../apis/matching/index.ts';
import { MatchingDto } from '../../../../apis/matching/dto.ts';
import { CardsProps } from './dto.ts';

const Cards: React.FC<CardsProps> = ({ decreaseMatchingCount }) => {
	const swiperRef = useRef<SwiperRef | null>(null);
	const [matchings, setMatchings] = useState<MatchingDto[]>([]);

	useEffect(() => {
		getMatchingList();
	}, []);

	// 매칭 리스트 조회
	const getMatchingList = async () => {
		const response = await getMatchingListApi();

		setMatchings(response.data.matching);
	};

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
					<SwiperSlide key={matching.matchingId}>
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
