import { StyledText } from '../Text/StyledText';
import { BottomSheetMenuLayout, SheetItem, Icon } from './styles';
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
						{item.icon && <Icon src={item.icon} />}
					</SheetItem>
				</div>
			))}
		</BottomSheetMenuLayout>
	);
});

export default BottomSheetMenu;
