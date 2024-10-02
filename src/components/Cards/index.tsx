import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { CardsContainer } from './styles';
import Card from './Card';
import { Relationship } from './Card/dto.ts';
import request from '../../apis/core';

interface CardsProps {
  onRemoveMatching: () => void; // 부모 컴포넌트에서 전달되는 함수
}

const Cards: React.FC<CardsProps> = ({ onRemoveMatching }) => {
	const swiperRef = useRef<SwiperRef | null>(null); // Swiper 인스턴스 참조
	const [relationships, setRelationships] = useState<Relationship[]>([]); // 매칭 요청 데이터를 상태로 관리
	const [slidesVisibility, setSlidesVisibility] = useState<boolean[]>([]); // 각 슬라이드의 가시성을 관리

  const fetchData = async () => {
    try {
      const response = await request.get<{
        isSuccess: boolean;
        code: number;
        message: string;
        result: Relationship[];
      }>('/user-relationships');
      
      // "pending" 상태의 요청만 필터링
      const pendingRelationships = response.result.filter(
        (relationship) => relationship.requestStatus === 'pending'
      );
      
      setRelationships(pendingRelationships);
      setSlidesVisibility(new Array(pendingRelationships.length).fill(true)); // 가시성을 초기화
    } catch (error) {
      console.error('Error fetching relationships:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 매칭 요청 거절 시 거절한 요청을 제거하는 함수
  const handleSlideNext = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      // 해당 요청을 리스트에서 제거
      const newSlidesVisibility = slidesVisibility.map((visible, i) => (i === index ? false : visible));
      setSlidesVisibility(newSlidesVisibility);
      onRemoveMatching(); // 매칭 요청 제거 시 부모 컴포넌트의 함수 호출
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
        {relationships.map((relationship, index) =>
          slidesVisibility[index] ? (
            <SwiperSlide key={relationship.id}>
              <Card
                relationship={relationship} // 데이터를 Card 컴포넌트에 전달
                onReject={() => handleSlideNext(index)}
              />
            </SwiperSlide>
          ) : null,
        )}
      </Swiper>
    </CardsContainer>
  );
};

export default Cards;
