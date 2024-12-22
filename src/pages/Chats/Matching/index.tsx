import React from 'react';
import Cards from './Cards/index';
import theme from '@styles/theme';
import { ReqeustInfo } from './styles';
import { StyledText } from '@components/Text/StyledText';
import type { MatchingProps } from './dto';

const Matching: React.FC<MatchingProps> = ({ matchingCount, decreaseMatchingCount }) => {
	return (
		<>
			<ReqeustInfo $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
				Message&nbsp;
				<StyledText $textTheme={{ style: 'body1-bold' }} color="#FF2389">
					{matchingCount}
				</StyledText>
			</ReqeustInfo>
			<Cards decreaseMatchingCount={decreaseMatchingCount} />
		</>
	);
};

export default React.memo(Matching);