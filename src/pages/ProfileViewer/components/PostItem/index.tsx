import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { PostItemContainer, PostImageContainer, PostImage, LikesCount, HeartIcon, LikesOverlay, PinSvg } from './style';
import HeartSvg from '../../../../assets/ProfileViewer/heart.svg';
import PinIcon from '../../../../assets/ProfileViewer/Group 87.svg';
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
					<LikesCount>
						<StyledText $textTheme={{ style: 'body5-medium' }} color={theme.colors.white}>
							{post.likes}
						</StyledText>
					</LikesCount>
				</LikesOverlay>
			</PostImageContainer>
		</PostItemContainer>
	);
};

export default PostItem;
