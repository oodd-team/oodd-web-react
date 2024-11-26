import { MenuButtonListProps } from './dto';
import { MenuListContainer, MenuButtonItem } from './styles';
import { StyledText } from '../../../Text/StyledText';
import theme from '../../../../styles/theme';

const MenuButtonList: React.FC<MenuButtonListProps> = ({ items, isVisible }) => {
	if (!isVisible) return null;

	return (
		<MenuListContainer isVisible={isVisible}>
			{items.map((item, index) => (
				<MenuButtonItem key={index} onClick={item.action}>
					<img src={item.icon} alt={`${item.text} icon`} />
					<StyledText $textTheme={{ style: 'caption2-regular' }} color={item.color}>
						{item.text}
					</StyledText>
				</MenuButtonItem>
			))}
		</MenuListContainer>
	);
};

export default MenuButtonList;
