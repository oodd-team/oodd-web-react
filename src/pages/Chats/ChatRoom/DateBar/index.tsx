import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { DatebarLayout, DateWrapper, Divider } from './styles';

interface DateBarProps {
	formattedDate: string; // yyyy년 MM월 dd일 EEEE
}

const DateBar: React.FC<DateBarProps> = React.memo(({ formattedDate }) => {
	return (
		<DatebarLayout>
			<Divider />
			<DateWrapper>
				<StyledText
					style={{ whiteSpace: 'nowrap' }}
					$textTheme={{ style: 'body6-light', lineHeight: 1 }}
					color={theme.colors.gray3}
				>
					{formattedDate}
				</StyledText>
			</DateWrapper>
			<Divider />
		</DatebarLayout>
	);
});

export default DateBar;
