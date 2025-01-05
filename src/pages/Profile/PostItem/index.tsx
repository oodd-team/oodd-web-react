import { useNavigate } from 'react-router-dom';

import theme from '@styles/theme';

import PinIcon from '@assets/default/pin.svg';

import Like from '@components/Icons/Like';
import Message from '@components/Icons/Message';

import { StyledText } from '@components/Text/StyledText';

import type { PostItemProps } from './dto';

import { PostItemLayout, PostImageContainer, PostImage, LikesOverlay, Pin } from './style';

const PostItem: React.FC<PostItemProps> = ({ post }) => {
	const navigate = useNavigate();
	const postImageUrl = post.imageUrl;

	const handlePostItemClick = () => {
		const path = `/post/${post.id}`;
		navigate(path);
	};

	return (
		<PostItemLayout onClick={handlePostItemClick}>
			<PostImageContainer>
				<PostImage src={postImageUrl} alt={`post-${post.id}`} />
				{post.isRepresentative && <Pin src={PinIcon} />}
				<LikesOverlay>
					<Like />
					<StyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.text.tertiary}>
						{post.postLikesCount}
					</StyledText>
					<Message color="#8E8E8E" />
					<StyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.text.tertiary}>
						{post.postCommentsCount}
					</StyledText>
				</LikesOverlay>
			</PostImageContainer>
		</PostItemLayout>
	);
};

export default PostItem;
