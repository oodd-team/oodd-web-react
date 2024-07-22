import React, { useState } from 'react';
import { HomeTabbarLayout, HomeTabbarUL, HomeTabbarWrapper } from './styles';
import { StyledText } from '../../../components/Text/StyledText';

const tabs = ['매칭', 'OOTD', '즐겨찾기'];

const HomeTabbar: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

	const handleTabClick = (tab: string) => {
		setSelectedTab(tab);
	};

	return (
		<HomeTabbarLayout>
			<HomeTabbarUL>
				{tabs.map((tab) => (
					<HomeTabbarWrapper key={tab} $isSelected={selectedTab === tab} onClick={() => handleTabClick(tab)}>
						<StyledText $textTheme={{ style: selectedTab === tab ? 'body2-medium' : 'body2-light', lineHeight: 1.5 }}>
							{tab}
						</StyledText>
					</HomeTabbarWrapper>
				))}
			</HomeTabbarUL>
		</HomeTabbarLayout>
	);
};

export default HomeTabbar;
