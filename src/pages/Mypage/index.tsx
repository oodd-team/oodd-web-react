import React from 'react';
import {
	ProfileContainer,
	Header,
	AvatarWrapper,
	Avatar,
	UserInfo,
	Username,
	Bio,
	StatsContainer,
	Stat,
	StatNumber,
	StatLabel,
	PostsContainer,
} from './styles';
import NavbarProfile from '../../components/NavbarProfile';
import avatarImage from '../../assets/avatar.png';
import ButtonSecondary from './ButtonSecondary';
import BottomNav from '../../components/BottomNav';
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import { PostData } from './dto';
import postImage from '../../assets/postImage.png'; // postImage 임포트

const Mypage: React.FC = () => {
	const navigate = useNavigate();

	const handlePostClick = (postId: string) => {
		navigate(`/post/${postId}`);
	};

	const posts: PostData[] = [
		{ id: '1', imgUrl: postImage, likes: 11, comments: 5 },
		{ id: '2', imgUrl: postImage, likes: 22, comments: 10 },
		{ id: '3', imgUrl: postImage, likes: 33, comments: 15 },
		{ id: '4', imgUrl: postImage, likes: 44, comments: 20 },
		{ id: '5', imgUrl: postImage, likes: 55, comments: 25 },
		{ id: '6', imgUrl: postImage, likes: 66, comments: 30 },
	];

	return (
		<ProfileContainer>
			<NavbarProfile />
			<Header>
				<AvatarWrapper>
					<Avatar src={avatarImage} alt="User Avatar" />
				</AvatarWrapper>
				<UserInfo>
					<Username>IDID</Username>
					<Bio>간단 소개글.....</Bio>
					<Bio>두 줄까지 가능</Bio>
				</UserInfo>
			</Header>
			<ButtonSecondary />
			<StatsContainer>
				<Stat>
					<StatLabel>OOTD</StatLabel>
					<StatNumber>6</StatNumber>
				</Stat>
				<Stat>
					<StatLabel>코멘트</StatLabel>
					<StatNumber>110</StatNumber>
				</Stat>
				<Stat>
					<StatLabel>좋아요</StatLabel>
					<StatNumber>110</StatNumber>
				</Stat>
			</StatsContainer>
			<PostsContainer>
				{posts.map((post, index) => (
					<Post
						key={post.id}
						imgUrl={post.imgUrl}
						likes={post.likes}
						comments={post.comments}
						onClick={() => handlePostClick(post.id)}
						isFirst={index === 0}
					/>
				))}
			</PostsContainer>
			<BottomNav />
		</ProfileContainer>
	);
};

export default Mypage;
