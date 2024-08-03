import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { BottomSheetMenuLayout, SheetItem, Icon } from './styles';
import { BottomSheetMenuProps, SheetItemDto } from './dto';

// BottomSheet 내부가 리스트 형태로 되어있을 때 사용 가능한 Item 컴포넌트
const BottomSheetMenu: React.FC<BottomSheetMenuProps> = ({ items, marginBottom }) => {
	return (
		<BottomSheetMenuLayout $marginBottom={marginBottom}>
			{items.map((item: SheetItemDto, index) => (
				<div key={index}>
					<SheetItem onClick={item.action}>
						<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.black}>
							{item.text}
						</StyledText>
						{/* TODO: 메뉴별 아이콘 로드 */}
						<Icon src={item.icon} />
					</SheetItem>
					{index < items.length - 1 && <hr style={{ color: 'rgba(0,0,0,0.2)', margin: '0' }} />}
				</div>
			))}
		</BottomSheetMenuLayout>
	);
};

export default BottomSheetMenu;
