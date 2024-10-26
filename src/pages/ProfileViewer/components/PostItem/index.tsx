import React from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../../../../styles/theme';
import {
	PostItemContainer,
	PostImageContainer,
	PostImage,
	LikesCountStyledText,
	HeartIcon,
	LikesOverlay,
	PinSvg,
} from './style';
import HeartSvg from '../../../../assets/default/white-heart.svg';
import PinIcon from '../../../../assets/default/pin.svg';
import { PostItemProps } from '../../dto';

const PostItem: React.FC<PostItemProps> = ({ post, isRepresentative, firstPhoto }) => {
	const navigate = useNavigate();
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
					<HeartIcon src={HeartSvg} alt="heart icon" />
					<LikesCountStyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.white}>
						{post.likes}
					</LikesCountStyledText>
				</LikesOverlay>
			</PostImageContainer>
		</PostItemContainer>
	);
};

export default PostItem;
