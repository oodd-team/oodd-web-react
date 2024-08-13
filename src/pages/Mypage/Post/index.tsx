import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContainer, ImageWrapper, Image, IconContainer, Icon, PinIcon } from './styles';
import Heart from './Heart.svg';
import Comment from './comment.svg';
import Pin from './pin.svg';

interface PostProps {
	imgUrl: string;
	likes: number;
	comments: number;
	onClick: () => void;
	isFirst?: boolean; // 첫 번째 포스트인지 여부를 나타내는 새로운 prop
}

const Post: React.FC<PostProps> = ({ imgUrl, likes, comments, onClick, isFirst }) => {
	const navigate = useNavigate();

	const handleIconClick = (event: React.MouseEvent, type: 'likes' | 'comments') => {
		event.stopPropagation();
		navigate(`/post/1/${type}`);
	};

	return (
		<PostContainer onClick={onClick}>
			<ImageWrapper>
				{isFirst && <PinIcon src={Pin} alt="Pin Icon" />}
				<Image src={imgUrl} alt="Post" />
				<IconContainer>
					<Icon onClick={(event) => handleIconClick(event, 'likes')}>
						<img src={Heart} alt="Like" />
						<span>{likes}</span>
					</Icon>
					<Icon onClick={(event) => handleIconClick(event, 'comments')}>
						<img src={Comment} alt="Comment" />
						<span>{comments}</span>
					</Icon>
				</IconContainer>
			</ImageWrapper>
		</PostContainer>
	);
};

export default Post;
