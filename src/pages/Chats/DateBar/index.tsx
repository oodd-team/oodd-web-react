import { memo } from 'react';

import theme from '@styles/theme';

import { DatebarLayout, Date, Divider } from './styles';

interface DateBarProps {
	formattedDate: string; // yyyy년 MM월 dd일 EEEE
}

const DateBar: React.FC<DateBarProps> = memo(({ formattedDate }) => {
	return (
		<DatebarLayout>
			<Divider />
			<Date $textTheme={{ style: 'caption1-regular' }} color={theme.colors.text.tertiary}>
				{formattedDate}
			</Date>
			<Divider />
		</DatebarLayout>
	);
});

export default DateBar;
