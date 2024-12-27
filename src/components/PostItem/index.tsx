import React from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '@styles/theme';
import PinIcon from '@assets/default/pin.svg';
import Like from '@components/Icons/Like';
import Message from '@components/Icons/Message';

import type { PostItemProps } from './dto';
import { PostItemLayout, PostImageContainer, PostImage, LikesCountStyledText, LikesOverlay, Pin } from './style';

const PostItem: React.FC<PostItemProps> = ({ post, isMyPost = true }) => {
	const navigate = useNavigate();
	const postImageUrl = post.imageUrl;

	const handlePostItemClick = () => {
		const path = isMyPost ? `/my-post/${post.id}` : `/post/${post.id}`;
		navigate(path);
	};

	return (
		<PostItemLayout onClick={handlePostItemClick}>
			<PostImageContainer>
				<PostImage src={postImageUrl} alt={`post-${post.id}`} />
				{post.isRepresentative && <Pin src={PinIcon} />}
				<LikesOverlay>
					<Like />
					<LikesCountStyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.gray3}>
						{post.postLikesCount}
					</LikesCountStyledText>
					<Message />
					<LikesCountStyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.gray3}>
						{post.postCommentsCount}
					</LikesCountStyledText>
				</LikesOverlay>
			</PostImageContainer>
		</PostItemLayout>
	);
};

export default PostItem;
