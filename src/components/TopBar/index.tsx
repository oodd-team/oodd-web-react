import React from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '@styles/theme';

import type { TopBarProps } from './dto';
import { TopBarLayout, StyledTextWrapper, LeftButton, RightButton } from './styles';

const TopBar: React.FC<TopBarProps> = ({
	text = '',
	RightButtonSrc,
	LeftButtonSrc,
	onClickLeftButton,
	onClickRightButton,
	$withBorder = false,
}) => {
	const navigate = useNavigate();

	return (
		<TopBarLayout $withBorder={$withBorder}>
			<LeftButton
				src={LeftButtonSrc}
				onClick={() => {
					if (onClickLeftButton) {
						onClickLeftButton();
					} else {
						navigate(-1);
					}
				}}
			>
				<img src={LeftButtonSrc || ''} alt="뒤로가기" />
			</LeftButton>
			<StyledTextWrapper $textTheme={{ style: 'body1-bold' }} color={theme.colors.black}>
				{text}
			</StyledTextWrapper>
			<RightButton
				src={RightButtonSrc}
				onClick={() => {
					if (onClickRightButton) {
						onClickRightButton();
					}
				}}
			>
				<img src={RightButtonSrc} alt="메뉴" />
			</RightButton>
		</TopBarLayout>
	);
};

export default TopBar;
