import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { BottomSheetMenuLayout, SheetItem, Icon } from './styles';
import { BottomSheetMenuProps, SheetItemDto } from './dto';

const BottomSheetMenu: React.FC<BottomSheetMenuProps> = ({ items, marginBottom }) => {
	return (
		<BottomSheetMenuLayout $marginBottom={marginBottom}>
			{items.map((item: SheetItemDto, index) => (
				<div key={index}>
					<SheetItem onClick={item.action}>
						<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.black}>
							{item.text}
						</StyledText>
						<Icon src={item.icon} />
					</SheetItem>
					{index < items.length - 1 && <hr style={{ color: 'rgba(0,0,0,0.2)', margin: '0' }} />}
				</div>
			))}
		</BottomSheetMenuLayout>
	);
};

export default BottomSheetMenu;
