import React from 'react';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';

const Items: React.FC = () => {
	return (
		<StyledText
			style={{ padding: '100px', cursor: 'pointer', backgroundColor: 'linen' }}
			$textTheme={{ style: 'body2-medium', lineHeight: 1 }}
			color={theme.colors.black}
		>
			색칠된 영역에 컴포넌트가 나타납니다
		</StyledText>
	);
};

export default Items;
