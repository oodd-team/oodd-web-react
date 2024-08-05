import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { TopbarLayout,TextLayout, BackButton, KebabMenuButton } from './styles';
import { useNavigate } from 'react-router-dom';
import { TopBarProps } from './dto';


const TopBar: React.FC<TopBarProps> = ({ ID = '', text = '', kebabMenuSrc, BackIcon, onBackClick, onKebabClick, $withBorder = false }) => {
	const nav = useNavigate();

	return (
		<TopbarLayout $withBorder={$withBorder}> {/*border-bottom 유무*/}
			<BackButton
			src={BackIcon || ''}
			alt="back"
			onClick={() => {
			if (onBackClick) {
				onBackClick();
			} else {
				nav(-1);
			}
			}}
      	/>
			<TextLayout>
				<StyledText $textTheme={{ style: 'body4-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
					{ID}
				</StyledText>
				<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
					{text}
				</StyledText>
			</TextLayout>
			<KebabMenuButton
			src={kebabMenuSrc || ''} // 이미지 사용 || 이미지 사용 X
			alt="menu"
			onClick={() => {
			if (onKebabClick) {
				onKebabClick();
			}
			}}
      />
    </TopbarLayout>
  );
};

export default TopBar;
