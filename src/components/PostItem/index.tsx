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
	const commentsCount = post.postCommentsCount ?? 0; // 현재 api 응답에 commentsCount가 없어 undefine 오류 해결 위해 설정, 추후 api 수정되면 삭제 해도 되는 행
	const imageUrl = post.imageUrl || 'https://via.placeholder.com/72';

	const handleClick = () => {
		const path = isMyPost ? `/my-post/${post.id}` : `/post/${post.id}`;
		navigate(path);
	};

	return (
		<PostItemContainer onClick={handleClick}>
			<PostImageContainer>
				<PostImage src={imageUrl} alt={`post-${post.id}`} />
				{post.isRepresentative && <PinSvg src={PinIcon} />}
				<LikesOverlay>
					<Icon src={HeartSvg} alt="heart icon" />
					<LikesCountStyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.gray3}>
						{post.postLikesCount}
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
