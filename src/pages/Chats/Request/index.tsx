import React from 'react';
import Cards from '../../../components/Cards';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { ReqeustInfo } from './styles';

const Request: React.FC<{ matchingRequests: number; handleRemoveMatching: () => void }> = ({
	matchingRequests,
	handleRemoveMatching,
}) => {
	return (
		<>
			<ReqeustInfo>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					Message {matchingRequests}
				</StyledText>
			</ReqeustInfo>
			<Cards onRemoveMatching={handleRemoveMatching} />
		</>
	);
};

export default React.memo(Request);
