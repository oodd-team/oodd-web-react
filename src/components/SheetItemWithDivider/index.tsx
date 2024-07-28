import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { SheetItemWithDividerLayout, SheetItem } from './styles';

interface Item {
	text: string;
	action: () => any; // item 클릭 시 호출될 함수
}

interface WithDividerProps {
	items: Item[]; // TODO: Item에서 메뉴별 아이콘 받도록 수정해야 함
	marginBottom: string;
}

// BottomSheet 내부가 리스트 형태로 되어있을 때 사용 가능한 Item 컴포넌트
const SheetItemWithDivider: React.FC<WithDividerProps> = ({ items, marginBottom }) => {
	return (
		<SheetItemWithDividerLayout $marginBottom={marginBottom}>
			{items.map((item, index) => (
				<div key={index}>
					<SheetItem onClick={item.action}>
						<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.black}>
							{item.text}
						</StyledText>
						{/* TODO: 메뉴별 아이콘 로드 */}
						<div></div>
					</SheetItem>
					{index < items.length - 1 && <hr style={{ color: 'rgba(0,0,0,0.3)', margin: '0' }} />}
				</div>
			))}
		</SheetItemWithDividerLayout>
	);
};

export default SheetItemWithDivider;
