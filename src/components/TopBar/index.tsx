import theme from '../../styles/theme';
import { TopbarLayout, StyledTextLayout, LeftButton, RightButton } from './styles';
import { useNavigate } from 'react-router-dom';
import { TopBarProps } from './dto';

const TopBar: React.FC<TopBarProps> = ({
	text = '',
	RightButtonSrc,
	LeftButtonSrc,
	onLeftClick,
	onRightClick,
	$withBorder = false,
}) => {
	const nav = useNavigate();

	return (
		<>
			<TopbarLayout $withBorder={$withBorder}>
				<LeftButton
					src={LeftButtonSrc}
					onClick={() => {
						if (onLeftClick) {
							onLeftClick();
						} else {
							nav(-1);
						}
					}}
				>
					<img src={LeftButtonSrc || ''} alt="뒤로가기" />
				</LeftButton>
				<StyledTextLayout $textTheme={{ style: 'body1-bold' }} color={theme.colors.black}>
					{text}
				</StyledTextLayout>
				<RightButton
					src={RightButtonSrc}
					onClick={() => {
						if (onRightClick) {
							onRightClick();
						}
					}}
				>
					<img src={RightButtonSrc} alt="메뉴" />
				</RightButton>
			</TopbarLayout>
		</>
	);
};

export default TopBar;
