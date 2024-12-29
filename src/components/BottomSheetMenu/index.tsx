import { StyledText } from '@components/Text/StyledText';
import { BottomSheetMenuLayout, SheetItem, IconButton } from './styles';
import type { BottomSheetMenuProps, SheetItemDto } from './dto';
import React from 'react';
import theme from '@styles/theme';

const BottomSheetMenu: React.FC<BottomSheetMenuProps> = React.memo(({ items }) => {
	return (
		<BottomSheetMenuLayout>
			{items.map((item: SheetItemDto, index) => (
				<div key={index}>
					<SheetItem onClick={item.action}>
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.text.tertiary}>
							{item.text}
						</StyledText>
						{item.icon && (
							<IconButton>
								<img src={item.icon} alt={`${item.text} 아이콘`} />
							</IconButton>
						)}
					</SheetItem>
				</div>
			))}
		</BottomSheetMenuLayout>
	);
});

export default BottomSheetMenu;
