import { useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { TabBarLayout, TabBarContainer, TabBox } from './styles';

interface TabBarProps {
	tab1: string; // tab1 이름
	tab2: string; // tab2 이름
	element1: React.ReactNode; // tab1에 보여질 컴포넌트
	element2: React.ReactNode; // tab2에 보여질 컴포넌트
	defaultViewTab1: boolean; // true: 초기 탭이 좌측(tab1)으로 설정
}

const TabBar: React.FC<TabBarProps> = ({ tab1, tab2, element1, element2, defaultViewTab1 }) => {
	const [viewTab1, setViewTab1] = useState<boolean>(defaultViewTab1);
	const hasNewRequest = true; // 요청 정보를 받아와 배열 길이가 0이면 false...

	const onClickTab1 = (): void => {
		setViewTab1(hasNewRequest && true);
	};

	const onClickTab2 = (): void => {
		setViewTab1(false);
	};

	return (
		<TabBarLayout>
			<TabBarContainer>
				<TabBox $isActive={viewTab1} onClick={onClickTab1}>
					<StyledText
						$textTheme={{ style: `${viewTab1 ? 'body2-medium' : 'body2-light'}`, lineHeight: 1.5 }}
						color={`${viewTab1 ? theme.colors.black : theme.colors.gray3}`}
					>
						{tab1}
					</StyledText>
				</TabBox>
				<TabBox $isActive={!viewTab1} onClick={onClickTab2}>
					<StyledText
						$textTheme={{ style: `${viewTab1 ? 'body2-light' : 'body2-medium'}`, lineHeight: 1.5 }}
						color={`${viewTab1 ? theme.colors.gray3 : theme.colors.black}`}
					>
						{tab2}
					</StyledText>
				</TabBox>
			</TabBarContainer>
			{viewTab1 ? element1 : element2}
		</TabBarLayout>
	);
};

export default TabBar;
