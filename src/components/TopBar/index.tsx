import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { TopbarLayout, TextLayout, BackButton, KebabMenuButton } from './styles';
import { useNavigate } from 'react-router-dom';
import { TopBarProps } from './dto';

const TopBar: React.FC<TopBarProps> = ({
	ID = '',
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
				<StyledText $textTheme={{ style: 'body4-light' }} color={theme.colors.gray3}>
					{ID}
				</StyledText>
				<StyledText $textTheme={{ style: 'body2-light' }}>{text}</StyledText>
			</TextLayout>
			<KebabMenuButton
				src={RightButtonSrc || ''} // 버튼에 src 직접 전달
				onClick={() => {
					if (onRightClick) {
						onRightClick();
					}
				}}
			/>
		</TopbarLayout>
	);
};

export default TopBar;
