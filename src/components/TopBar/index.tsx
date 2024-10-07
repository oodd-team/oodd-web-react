import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { TopbarLayout, TextLayout, BackButton, KebabMenuButton } from './styles';
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
			{' '}
			{/*border-bottom 유무*/}
			<BackButton
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
			<TextLayout>
				<StyledText $textTheme={{ style: 'heading1-bold' }} color={theme.colors.black}>
					{text}
				</StyledText>
			</TextLayout>
			<KebabMenuButton
				onClick={() => {
					if (onRightClick) {
						onRightClick();
					}
				}}
			>
				<img src={RightButtonSrc || ''} alt="menu" />
			</KebabMenuButton>
		</TopbarLayout>
	);
};

export default TopBar;
