import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';

import { StyledText } from '../../components/Text/StyledText';
import Matching from './Matching';
import OOTD from './OOTD';
import Favorites from './Favorites';
import { HomeTabBarLayout, HomeTabBarList, HomeTabBarWrapper, TabLayout, Tabs } from './styles';

const tabs = ['매칭', 'OOTD', '즐겨찾기'];

const HomeTabbar: React.FC = () => {
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
		<TabLayout>
			<HomeTabBarLayout>
				<HomeTabBarList>
					{tabs.map((tab, index) => (
						<HomeTabBarWrapper key={tab} $isSelected={activeIndex === index} onClick={() => handleTabClick(index)}>
							<StyledText
								$textTheme={{ style: activeIndex === index ? 'body2-medium' : 'body2-light', lineHeight: 1.5 }}
							>
								{tab}
							</StyledText>
						</HomeTabBarWrapper>
					))}
				</HomeTabBarList>
			</HomeTabBarLayout>
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
					<SwiperSlide style={{ height: 'auto' }}>
						<Matching />
					</SwiperSlide>
					<SwiperSlide style={{ height: 'auto' }}>
						<OOTD />
					</SwiperSlide>
					<SwiperSlide style={{ height: 'auto' }}>
						<Favorites />
					</SwiperSlide>
				</Swiper>
			</Tabs>
		</TabLayout>
	);
};

export default HomeTabbar;
