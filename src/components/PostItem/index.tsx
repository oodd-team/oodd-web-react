import React from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';
import {
	PostItemContainer,
	PostImageContainer,
	PostImage,
	LikesCountStyledText,
	Icon,
	LikesOverlay,
	PinSvg,
} from './style';
import HeartSvg from '../../assets/default/like.svg';
import MessageSvg from '../../assets/default/message.svg';
import PinIcon from '../../assets/default/pin.svg';
import { PostItemProps } from './dto';

const PostItem: React.FC<PostItemProps> = ({ post, isMyPost = true }) => {
	const navigate = useNavigate();
	const imageUrl = post.postImages?.[0]?.imageUrl || 'https://via.placeholder.com/72';

	console.log('postImages', post.postImages);
	const handleClick = () => {
		const path = isMyPost ? `/my-post/${post.postId}` : `/post/${post.postId}`;
		navigate(path);
	};

	return (
		<PostItemContainer onClick={handleClick}>
			<PostImageContainer>
				<PostImage src={imageUrl} alt={`post-${post.postId}`} />
				{post.isRepresentative && <PinSvg src={PinIcon} />}
				<LikesOverlay>
					<Icon src={HeartSvg} alt="heart icon" />
					<LikesCountStyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.gray3}>
						{post.likeCount}
					</LikesCountStyledText>
					<Icon src={MessageSvg} alt="message icon" />
					<LikesCountStyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.gray3}>
						{post.commentCount}
					</LikesCountStyledText>
				</LikesOverlay>
			</PostImageContainer>
		</PostItemContainer>
	);
};

export default PostItem;
