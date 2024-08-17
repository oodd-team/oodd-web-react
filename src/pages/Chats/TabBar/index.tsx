import { useEffect, useRef, useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import { TabBarLayout, TabBarContainer, TabBarWrapper, TabBarList, Tabs } from './styles';
import request from '../../../apis/core';
import Request from '../Request';
import RecentChat from '../RecentChat';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';

const tabs = ['요청', '최근 채팅'];

const TabBar: React.FC = () => {
	const [matchingRequest, setMatchingRequest] = useState(0);
	const [hasNewRequest, setHasNewRequest] = useState(true);

	const [activeIndex, setActiveIndex] = useState<number>(1);
	const swiperRef = useRef<SwiperCore | null>(null);

	const handleTabClick = (index: number) => {
		// 요청이 있는 경우에만 탭 변경 가능
		if (hasNewRequest) {
			setActiveIndex(index);
		}
		if (swiperRef.current) {
			swiperRef.current.slideTo(index);
		}
	};

	const handleSwiperChange = (swiper: SwiperCore) => {
		setActiveIndex(swiper.activeIndex);
	};

	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.slideTo(1, 0);
		}
		// 	const getRequestList = async () => {
		// 		try {
		// 			const response = await request.get<{ [key: string]: any }>('/user-relationships');

		// 			if (response?.isSuccess) {
		// 				setMatchingRequest(response.result.length);
		//				setHasNewRequest(response.result.length !== 0);
		// 			}
		// 		} catch {}
		// 	};

		// 	getRequestList();
	}, []);

	return (
		<TabBarLayout>
			<TabBarContainer>
				<TabBarList>
					{tabs.map((tab, index) => (
						<TabBarWrapper
							key={tab}
							$isSelected={!!(activeIndex === index && (index || hasNewRequest))}
							$isPointer={!!(hasNewRequest || index)}
							onClick={() => handleTabClick(index)}
						>
							<StyledText
								$textTheme={{
									style: activeIndex === index && (index || hasNewRequest) ? 'body2-medium' : 'body2-light',
									lineHeight: 1.5,
								}}
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
					spaceBetween={0}
					slidesPerView={1}
					autoHeight={true} // 각 슬라이드 높이를 자동으로 조정
					style={{ height: '100%' }}
				>
					{hasNewRequest && (
						<SwiperSlide style={{ height: 'calc(100vh - 10.75rem)' }}>
							<Request />
						</SwiperSlide>
					)}
					<SwiperSlide style={{ height: 'calc(100vh - 10.75rem)' }}>
						<RecentChat />
					</SwiperSlide>
				</Swiper>
			</Tabs>
		</TabBarLayout>
	);
};

export default TabBar;
