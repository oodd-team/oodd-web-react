import { useEffect, useRef, useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import { TabBarLayout, TabBarContainer, TabBarWrapper, TabBarList, Tabs } from './styles';
import Request from '../Request';
import RecentChat from '../RecentChat';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import request from '../../../apis/core';
import theme from '../../../styles/theme';

const tabs = ['요청', '최근 채팅'];

const TabBar: React.FC = () => {
	const [matchingRequests, setMatchingRequests] = useState(0);
	const [hasMatchingRequests, setHasMatchingRequests] = useState(false);

	const [activeIndex, setActiveIndex] = useState<number>(1);
	const swiperRef = useRef<SwiperCore | null>(null);

	const handleTabClick = (index: number) => {
		// 매칭 요청이 있는 경우에만 '매칭' 탭을 활성화
		if (index !== 0 || hasMatchingRequests) {
			setActiveIndex(index);
			if (swiperRef.current) {
				swiperRef.current.slideTo(index);
			}
		}
	};

	const handleSwiperChange = (swiper: SwiperCore) => {
		// 매칭 요청이 없고 1번 index에 있을 때 0번 탭 비활성화
		if (!hasMatchingRequests && swiper.activeIndex < swiper.previousIndex) {
			swiper.allowSlidePrev = false;
		}
		// 매칭 요청이 없고 0번 index에 있을 때 1번 탭으로 이동
		else if (!hasMatchingRequests && swiper.activeIndex > swiper.previousIndex) {
			swiper.slideNext();
		}
		// 매칭 요청이 있을 때 양쪽 스와이퍼 가능
		else {
			swiper.allowSlidePrev = true;
			setActiveIndex(swiper.activeIndex);
		}
	};

	useEffect(() => {
		// 첫 탭을 최근 채팅으로 설정
		if (swiperRef.current) {
			swiperRef.current.slideTo(1, 0);
		}
		const getRequestList = async () => {
			try {
				const response = await request.get<{ [key: string]: any }>('/user-relationships');

				if (response?.isSuccess) {
					setMatchingRequests(response.result.length);
					setHasMatchingRequests(response.result.length !== 0);
				} else {
					console.error(response.message);
				}
			} catch (error) {
				console.error(error);
			}
		};

		getRequestList();
	}, []);

	return (
		<TabBarLayout>
			<TabBarContainer>
				<TabBarList>
					{tabs.map((tab, index) => (
						<TabBarWrapper
							key={tab}
							$isSelected={activeIndex === index && (index !== 0 || hasMatchingRequests)}
							$isPointer={index !== 0 || hasMatchingRequests}
							onClick={() => handleTabClick(index)}
						>
							<StyledText
								$textTheme={{
									style: activeIndex === index && (index !== 0 || hasMatchingRequests) ? 'body2-medium' : 'body2-light',
									lineHeight: 1.5,
								}}
								color={index === 0 && !hasMatchingRequests ? theme.colors.gray3 : undefined} // 비활성화된 경우 글자 색을 변경
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
					onSlideChange={handleSwiperChange}
					allowSlidePrev={hasMatchingRequests}
					spaceBetween={0}
					slidesPerView={1}
					autoHeight={true} // 각 슬라이드 높이를 자동으로 조정
				>
					<SwiperSlide style={{ height: 'calc(100vh - 5.25rem)' }}>
						<Request matchingRequests={matchingRequests} />
					</SwiperSlide>
					<SwiperSlide style={{ height: 'calc(100vh - 5.25rem)' }}>
						<RecentChat swiperRef={swiperRef} />
					</SwiperSlide>
				</Swiper>
			</Tabs>
		</TabBarLayout>
	);
};

export default TabBar;
