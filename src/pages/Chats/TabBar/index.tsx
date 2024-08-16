import { useRef, useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { TabBarLayout, TabBarContainer, TabBarWrapper, TabBarList, Tabs } from './styles';

import Request from '../Request';
import RecentChat from '../RecentChat';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';

const tabs = ['요청', '최근 채팅'];

const TabBar: React.FC = () => {
	const hasNewRequest = true; // 요청 정보를 받아와 배열 길이가 0이면 false...

	const [activeIndex, setActiveIndex] = useState<number>(0);
	const swiperRef = useRef<SwiperCore | null>(null);

	const handleTabClick = (index: number) => {
		setActiveIndex(index);
		if (swiperRef.current) {
			swiperRef.current.slideTo(index);
		}
	};

	const handleSwiperChange = (swiper: SwiperCore) => {
		setActiveIndex(swiper.activeIndex);
	};

	return (
		<TabBarLayout>
			<TabBarContainer>
				<TabBarList>
					{tabs.map((tab, index) => (
						<TabBarWrapper key={tab} $isSelected={activeIndex === index} onClick={() => handleTabClick(index)}>
							<StyledText
								$textTheme={{ style: activeIndex === index ? 'body2-medium' : 'body2-light', lineHeight: 1.5 }}
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
					<SwiperSlide style={{ height: 'calc(100vh - 10.75rem)' }}>
						<Request />
					</SwiperSlide>
					<SwiperSlide style={{ height: 'calc(100vh - 10.75rem)' }}>
						<RecentChat />
					</SwiperSlide>
				</Swiper>
			</Tabs>
		</TabBarLayout>
	);
};

export default TabBar;
