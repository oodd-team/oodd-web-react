import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { SheetItemWithDividerLayout, SheetItem } from './styles';

interface WithDividerProps {
	items: any[]; // text와 icon 정보가 담긴 객체의 배열로 받아야 할지. . .
	marginBottom: string;
}

// BottomSheet 내부가 리스트 형태로 되어있을 때 사용 가능한 Item 컴포넌트
const SheetItemWithDivider: React.FC<WithDividerProps> = ({ items, marginBottom }) => {
	return (
		<SheetItemWithDividerLayout $marginBottom={marginBottom}>
			{items.map((item, index) => (
				<div key={index}>
					<SheetItem>
						<StyledText textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.black}>
							{item}
						</StyledText>
						{/* TODO: 메뉴별 아이콘 로드 */}
						<div></div>
					</SheetItem>
					{index < items.length - 1 && <hr style={{ color: 'rgba(0,0,0,0.3)' }} />}
				</div>
			))}
		</SheetItemWithDividerLayout>
	);
};

export default SheetItemWithDivider;
