import React, { useState } from 'react';
import { StyledText } from '../../components/Text/StyledText';
import Matching from './Matching';
import OOTD from './OOTD';
import Favorites from './Favorites';
import { HomeTabBarLayout, HomeTabBarList, HomeTabBarWrapper, TabLayout, Tabs } from './styles';

const tabs = ['매칭', 'OOTD', '즐겨찾기'];

// Home 페이지의 탭 바입니다. 매칭, OOTD, 즐겨찾기 탭으로 이동할 수 있습니다.
const HomeTabbar: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

	const handleTabClick = (tab: string) => {
		setSelectedTab(tab);
	};

	return (
		<TabLayout>
			<HomeTabBarLayout>
				<HomeTabBarList>
					{tabs.map((tab) => (
						<HomeTabBarWrapper key={tab} $isSelected={selectedTab === tab} onClick={() => handleTabClick(tab)}>
							<StyledText $textTheme={{ style: selectedTab === tab ? 'body2-medium' : 'body2-light', lineHeight: 1.5 }}>
								{tab}
							</StyledText>
						</HomeTabBarWrapper>
					))}
				</HomeTabBarList>
			</HomeTabBarLayout>
			<Tabs>
				{selectedTab === '매칭' && <Matching />}
				{selectedTab === 'OOTD' && <OOTD />}
				{selectedTab === '즐겨찾기' && <Favorites />}
			</Tabs>
		</TabLayout>
	);
};

export default HomeTabbar;
