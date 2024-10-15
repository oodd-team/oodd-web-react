import theme from '../../styles/theme';
import { TopbarLayout, StyledTextLayout, BackButton, KebabMenuButton } from './styles';
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
		<TopbarLayout $withBorder={$withBorder}>
			<BackButton
				src={LeftButtonSrc}
				onClick={() => {
					if (onLeftClick) {
						onLeftClick();
					} else {
						nav(-1);
					}
				}}
			>
				<img src={LeftButtonSrc || ''} alt="back" />
			</BackButton>
			<StyledTextLayout $textTheme={{ style: 'heading1-bold' }} color={theme.colors.black}>
				{text}
			</StyledTextLayout>
			<KebabMenuButton
				src={RightButtonSrc}
				onClick={() => {
					if (onRightClick) {
						onRightClick();
					}
				}}
			>
				<img src={RightButtonSrc} alt="menu" />
			</KebabMenuButton>
		</TopbarLayout>
	);
};

export default TopBar;
