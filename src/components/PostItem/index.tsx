import React from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '@/styles/theme';
import PinIcon from '@/assets/default/pin.svg';
import Heart from '@components/Icons/Heart';
import Message from '@components/Icons/Message';

import { PostItemLayout, PostImageContainer, PostImage, LikesCountStyledText, LikesOverlay, Pin } from './style';
import type { PostItemProps } from './dto';

const PostItem: React.FC<PostItemProps> = ({ post, isMyPost = true }) => {
	const navigate = useNavigate();
	const PostImageUrl = post.imageUrl;

	const handlePostClick = () => {
		const path = isMyPost ? `/my-post/${post.id}` : `/post/${post.id}`;
		navigate(path);
	};

	return (
		<PostItemLayout onClick={handlePostClick}>
			<PostImageContainer>
				<PostImage src={PostImageUrl} alt={`post-${post.id}`} />
				{post.isRepresentative && <Pin src={PinIcon} />}
				<LikesOverlay>
					<Heart />
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
