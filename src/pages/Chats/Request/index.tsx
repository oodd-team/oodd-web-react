import React from 'react';
import Cards from '../../../components/Cards';
import theme from '../../../styles/theme';
import { ReqeustInfo } from './styles';
import { StyledText } from '../../../components/Text/StyledText';

const Request: React.FC<{ matchingRequests: number; handleRemoveMatching: () => void }> = ({
	matchingRequests,
	handleRemoveMatching,
}) => {
	return (
		<>
			<ReqeustInfo $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
				Message&nbsp;
				<StyledText $textTheme={{ style: 'body1-bold' }} color="#FF2389">
					{matchingRequests}
				</StyledText>
			</ReqeustInfo>
			<Cards onRemoveMatching={handleRemoveMatching} />
		</>
	);
};

export default React.memo(Request);
