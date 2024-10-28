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

const PostItem: React.FC<PostItemProps> = ({ post, isRepresentative, firstPhoto }) => {
	const navigate = useNavigate();
	console.log(post.likes, post.commentsCount);
	const commentsCount = post.commentsCount ?? 0;
	const imageUrl = firstPhoto || 'https://via.placeholder.com/72';
	const handleClick = () => {
		navigate(`/post/${post.postId}`);
	};
	return (
		<PostItemContainer onClick={handleClick}>
			<PostImageContainer>
				<PostImage src={imageUrl} alt={`post-${post.postId}`} />
				{isRepresentative && <PinSvg src={PinIcon} />}
				<LikesOverlay>
					<Icon src={HeartSvg} alt="heart icon" />
					<LikesCountStyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.gray3}>
						{post.likes}
					</LikesCountStyledText>
					<Icon src={MessageSvg} alt="message icon" />
					<LikesCountStyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.gray3}>
						{commentsCount}
					</LikesCountStyledText>
				</LikesOverlay>
			</PostImageContainer>
		</PostItemContainer>
	);
};

export default PostItem;
