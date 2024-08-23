import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';

import { StyledText } from '../../components/Text/StyledText';
import Matching from './Matching';
import OOTD from './OOTD';
import Favorites from './Favorites';
import { HomeTabBarLayout, HomeTabBarList, HomeTabBarWrapper, TabLayout, Tabs } from './styles';
import Tooltip from './Tooltip';
import request, { BaseResponse } from '../../apis/core';
import theme from '../../styles/theme';

interface Relationship {
	id: number;
	requestStatus: string;
}

const tabs = ['매칭', 'OOTD', '즐겨찾기'];

interface HomeTabBarProps {
	onOpenBottomSheet: () => void;
	onOpenReportSheet: () => void;
	onOpenCommentModal: () => void;
	onOpenConfirmationModal: () => void;
}

const HomeTabBar: React.FC<HomeTabBarProps> = ({ onOpenBottomSheet }) => {
	const [activeIndex, setActiveIndex] = useState<number>(1); // 초기화 시 OOTD 탭이 기본 활성화
	const [hasMatchingRequests, setHasMatchingRequests] = useState<boolean>(false); // 매칭 요청 존재 여부
	const [isMatchingReady, setIsMatchingReady] = useState<boolean>(false); // Matching 탭이 준비된 상태인지 확인
	const swiperRef = useRef<SwiperCore | null>(null);

	const cardRef = useRef<HTMLDivElement>(null);
	const ootdTooltipRef = useRef<HTMLDivElement[]>([]);

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
		setActiveIndex(swiper.activeIndex);
	};

	const fetchMatchingRequests = async () => {
		try {
			const response = await request.get<BaseResponse<Relationship[]>>('/user-relationships');

			// "pending" 상태의 요청만 필터링
			const pendingRelationships = response.result.filter((relationship) => relationship.requestStatus === 'pending');

			// 매칭 요청이 있는지 여부를 상태로 설정
			setHasMatchingRequests(pendingRelationships.length > 0);

			// Matching 탭이 준비된 상태로 설정
			setIsMatchingReady(true);
		} catch (error) {
			console.error('Error fetching relationships:', error);
		}
	};

	useEffect(() => {
		fetchMatchingRequests();
	}, []);

	return (
		<TabLayout>
			<Tooltip cardRef={cardRef} ootdTooltipRef={ootdTooltipRef} activeIndex={activeIndex} />
			<HomeTabBarLayout>
				<HomeTabBarList>
					{tabs.map((tab, index) => (
						<HomeTabBarWrapper
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
					autoHeight={true}
					initialSlide={1} // OOTD 탭을 초기화 시 기본 슬라이드로 설정
					style={{ height: '100%' }}
				>
					<SwiperSlide
						style={{ height: 'auto', visibility: hasMatchingRequests && isMatchingReady ? 'visible' : 'hidden' }}
					>
						<Matching tooltipRef={cardRef} />
					</SwiperSlide>
					<SwiperSlide style={{ height: 'auto' }}>
						<OOTD tooltipRef={ootdTooltipRef} onMoreClick={onOpenBottomSheet} />
					</SwiperSlide>
					<SwiperSlide style={{ height: 'auto' }}>
						<Favorites onTabSelect={() => setActiveIndex(2)} />
					</SwiperSlide>
				</Swiper>
			</Tabs>
		</TabLayout>
	);
};

export default HomeTabBar;
