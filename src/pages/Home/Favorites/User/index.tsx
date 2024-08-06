import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { UserProps } from '../dto';
import { UserImgBorder, UserImgWrapper, UserWrapper } from './styles';

interface Props {
	user: UserProps;
	isSelected: boolean;
	onClick: () => void;
}

const User: React.FC<Props> = ({ user, isSelected, onClick }) => {
	return (
		<UserWrapper isSelected={isSelected} onClick={onClick}>
			<UserImgBorder isSelected={isSelected}>
				<UserImgWrapper>
					<img src={user.userImgUrl} alt="user" />
				</UserImgWrapper>
			</UserImgBorder>
			<StyledText $textTheme={{ style: 'body5-light', lineHeight: 1 }} color={theme.colors.black}>
				{user.userName}
			</StyledText>
		</UserWrapper>
	);
};

export default User;
