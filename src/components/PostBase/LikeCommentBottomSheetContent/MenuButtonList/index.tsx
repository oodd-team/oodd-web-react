import { MenuButtonListProps } from './dto';
import { MenuListContainer, MenuButton } from './styles';

const MenuButtonList: React.FC<MenuButtonListProps> = ({ items, isVisible }) => {
	if (!isVisible) return null;

	return (
		<MenuListContainer isVisible={isVisible}>
			{items.map((item, index) => (
				<MenuButton key={index} backgroundColor={item.backgroundColor} onClick={item.action}>
					<img src={item.icon} alt={`${item.text} icon`} />
					<span>{item.text}</span>
				</MenuButton>
			))}
		</MenuListContainer>
	);
};

export default MenuButtonList;
