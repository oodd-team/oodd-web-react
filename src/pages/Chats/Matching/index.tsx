import { memo } from 'react';

import theme from '@styles/theme';

import { StyledText } from '@components/Text/StyledText';

import type { MatchingProps } from './dto';

import Cards from './Cards/index';

import { ReqeustInfo } from './styles';

const Matching: React.FC<MatchingProps> = ({ matchingCount, decreaseMatchingCount }) => {
	return (
		<>
			<ReqeustInfo $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
				Message&nbsp;
				<StyledText $textTheme={{ style: 'body1-bold' }} color={theme.colors.brand.primary}>
					{matchingCount}
				</StyledText>
			</ReqeustInfo>
			<Cards decreaseMatchingCount={decreaseMatchingCount} />
		</>
	);
};

export default memo(Matching);
