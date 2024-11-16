import React from 'react';
import Cards from '../../../components/Cards';
import theme from '../../../styles/theme';
import { ReqeustInfo } from './styles';
import { StyledText } from '../../../components/Text/StyledText';

const Request: React.FC<{ matchingCount: number; handleRemoveMatching: () => void }> = ({
	matchingCount,
	handleRemoveMatching,
}) => {
	return (
		<>
			<ReqeustInfo $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
				Message&nbsp;
				<StyledText $textTheme={{ style: 'body1-bold' }} color="#FF2389">
					{matchingCount}
				</StyledText>
			</ReqeustInfo>
			<Cards onRemoveMatching={handleRemoveMatching} />
		</>
	);
};

export default React.memo(Request);
