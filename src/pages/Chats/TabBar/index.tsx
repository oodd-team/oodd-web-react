import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import { TabBarLayout, TabBarContainer, TabBarWrapper, TabBarList, Tabs } from './styles';
import Request from '../Request';
import RecentChat from '../RecentChat';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import { getMatchingListApi } from '../../../apis/matching';

const TabBar: React.FC = () => {
	const [matchingCount, setMatchingCount] = useState(0);
	const [hasMatchingRequest, setHasMatchingRequest] = useState(false);

	const [activeIndex, setActiveIndex] = useState<number>(1);
	const swiperRef = useRef<SwiperCore | null>(null);
	const tabs = [`요청 ${matchingCount}`, '최근 채팅'];

	useEffect(() => {
		// 첫 탭을 최근 채팅으로 설정
		if (swiperRef.current) {
			swiperRef.current.slideTo(1, 0);
		}

		getMatchingList();
	}, []);

	// 매칭 리스트 조회
	const getMatchingList = async () => {
		const response = await getMatchingListApi();

		if (response?.isSuccess) {
			setMatchingCount(response.data.matchingCount);
			setHasMatchingRequest(response.data.isMatching);
		}
	};

	// 매칭 요청이 있는 경우에만 '요청' 탭을 활성화
	const handleTabClick = useCallback(
		(index: number) => {
			if (index !== 0 || hasMatchingRequest) {
				setActiveIndex(index);
				if (swiperRef.current) {
					swiperRef.current.slideTo(index);
				}
			}
		},
		[hasMatchingRequest],
	);

	// 슬라이드가 변경될 때 호출
	const handleSlideChange = useCallback(
		(swiper: SwiperCore) => {
			// 매칭 요청이 없고 1번 index에 있을 때 0번 탭 비활성화
			if (!hasMatchingRequest && swiper.activeIndex < swiper.previousIndex) {
				swiper.allowSlidePrev = false;
			}
			// 매칭 요청이 있을 때 양쪽 스와이퍼 가능
			else {
				swiper.allowSlidePrev = true;
				setActiveIndex(swiper.activeIndex);
			}
		},
		[hasMatchingRequest],
	);

	// request 컴포넌트에서 매칭 거절 시 matchingCount 감소
	const decreaseMatchingCount = useCallback(() => {
		if (matchingCount !== 1) {
			setMatchingCount((prev) => Math.max(0, prev - 1));
		} else {
			setHasMatchingRequest(false);
			swiperRef.current?.slideNext();
		}
	}, [matchingCount]);

	return (
		<TabBarLayout>
			<TabBarContainer>
				<TabBarList>
					{tabs.map((tab, index) => (
						<TabBarWrapper
							key={tab}
							$isSelected={activeIndex === index && (index !== 0 || hasMatchingRequest)}
							$isPointer={index !== 0 || hasMatchingRequest}
							onClick={() => handleTabClick(index)}
						>
							<StyledText
								$textTheme={{
									style: activeIndex === index && (index !== 0 || hasMatchingRequest) ? 'body2-bold' : 'body2-medium',
								}}
								color={activeIndex === index && (index !== 0 || hasMatchingRequest) ? '#FF2389' : '#888888'}
							>
								{tab}
							</StyledText>
						</TabBarWrapper>
					))}
				</TabBarList>
			</TabBarContainer>
			<Tabs>
				<Swiper
					onSwiper={(swiper) => {
						swiperRef.current = swiper;
					}}
					onSlideChange={handleSlideChange}
					allowSlidePrev={hasMatchingRequest}
					spaceBetween={0}
					slidesPerView={1}
					autoHeight={true} // 각 슬라이드 높이를 자동으로 조정
				>
					<SwiperSlide className="swiper-slider">
						<Request matchingCount={matchingCount} decreaseMatchingCount={decreaseMatchingCount} />
					</SwiperSlide>
					<SwiperSlide className="swiper-slider">
						<RecentChat matchingCount={matchingCount} swiperRef={swiperRef} />
					</SwiperSlide>
				</Swiper>
			</Tabs>
		</TabBarLayout>
	);
};

export default React.memo(TabBar);
