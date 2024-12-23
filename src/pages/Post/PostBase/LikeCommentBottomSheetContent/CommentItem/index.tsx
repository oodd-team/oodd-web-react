import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import theme from '../../../../../styles/theme';
import {
	StyledBigUserProfile,
	CommentItem as StyledCommentItem,
	CommentContent,
	RightContainer,
	MenuBtn,
} from './styles';

import { StyledText } from '../../../../../components/Text/StyledText';

import { CommentItemProps } from './dto';

import More from '../../../../assets/default/more.svg';

const CommentItem: React.FC<CommentItemProps> = ({ comment, handleUserClick, handleMenuOpen }) => {
	const [timeAgo, setTimeAgo] = useState<string | null>();

	useEffect(() => {
		setTimeAgo(dayjs(comment.createdAt).locale('ko').fromNow());
	}, [comment]);

	return (
		<StyledCommentItem key={comment.id}>
			<StyledBigUserProfile>
				<img src={comment.user.profilePictureUrl} onClick={() => handleUserClick(comment.user.id)} alt="user avatar" />
			</StyledBigUserProfile>
			<CommentContent>
				<StyledText onClick={() => handleUserClick(comment.user.id)} $textTheme={{ style: 'body2-medium' }}>
					{comment.user.nickname}
				</StyledText>
				<StyledText $textTheme={{ style: 'body2-regular' }}>{comment.content}</StyledText>
			</CommentContent>
			<RightContainer>
				<StyledText className="timeAgo" $textTheme={{ style: 'caption2-regular' }} color={theme.colors.gray3}>
					{timeAgo}
				</StyledText>
				<MenuBtn onClick={(event) => handleMenuOpen(comment, event)}>
					<img src={More} alt="more" />
				</MenuBtn>
			</RightContainer>
		</StyledCommentItem>
	);
};

export default CommentItem;
