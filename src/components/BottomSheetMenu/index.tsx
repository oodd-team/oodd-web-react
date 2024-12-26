import { StyledText } from '@components/Text/StyledText';
import { BottomSheetMenuLayout, SheetItem, IconButton } from './styles';
import { BottomSheetMenuProps, SheetItemDto } from './dto';
import React from 'react';

const BottomSheetMenu: React.FC<BottomSheetMenuProps> = React.memo(({ items }) => {
	return (
		<BottomSheetMenuLayout>
			{items.map((item: SheetItemDto, index) => (
				<div key={index}>
					<SheetItem onClick={item.action}>
						<StyledText $textTheme={{ style: 'body1-medium' }} color={'#7b7b7b'}>
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
