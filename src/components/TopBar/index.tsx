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
				src={LeftButtonSrc || ''}
				alt="back"
				onClick={() => {
					if (onLeftClick) {
						onLeftClick();
					} else {
						nav(-1);
					}
				}}
			/>
			<TextLayout>
				<StyledText $textTheme={{ style: 'body4-light' }} color={theme.colors.gray3}>
					{ID}
				</StyledText>
				<StyledText $textTheme={{ style: 'body2-light' }}>{text}</StyledText>
			</TextLayout>
			<KebabMenuButton
				src={RightButtonSrc || ''} // 이미지 사용 || 이미지 사용 X
				alt="menu"
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
