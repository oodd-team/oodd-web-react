import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import theme from '../../styles/theme';

import { postIdAtom, userIdAtom, userNameAtom } from '../../recoil/Post/PostAtom';

import { OODDFrame } from '../Frame/Frame';
import { StyledText } from '../Text/StyledText';
import TopBar from '../TopBar';
import NavBar from '../NavBar';
import BottomSheet from '../BottomSheet';
import ClothingInfoItem from '../ClothingInfoItem';
import Loading from '../Loading';
import ImageSwiper from './ImageSwiper';
import LikeCommentBottomSheetContent from './LikeCommentBottomSheetContent';

import {
	PostContainer,
	PostInfoContainer,
	UserInfo,
	UserProfile,
	UserName,
	MenuBtn,
	Content,
	IconRow,
	IconWrapper,
	ClothingInfoList,
} from './styles';

import Left from '../../assets/arrow/left.svg';
import Like from '../../assets/default/like.svg';
//import LikeFill from '../../assets/default/like-fill.svg';
import Message from '../../assets/default/message.svg';
import More from '../../assets/default/more.svg';

import { BottomSheetProps } from '../BottomSheet/dto';
import { PostBaseProps } from './dto';
import { GetPostResponse } from '../../apis/Post/dto';
import { UpdatePostLikeResponse } from '../../apis/post-like/dto';

import request from '../../apis/core';
import { getPostApi } from '../../apis/Post';

const PostBase: React.FC<PostBaseProps> = ({ onClickMenu }) => {
	const { postId } = useParams<{ postId: string }>();
	const [, setPostId] = useRecoilState(postIdAtom);
	const [post, setPost] = useState<GetPostResponse['data']>();
	const [, setUserId] = useRecoilState<number>(userIdAtom);
	const [userName, setUserName] = useRecoilState<string>(userNameAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [isLikeCommentBottomSheetOpen, setIsLikeCommentBottomSheetOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>('likes'); // activeTab state

	const nav = useNavigate();

	useEffect(() => {
		setPostId(Number(postId));
		// 게시글 정보 가져오기
		const getPost = async () => {
			try {
				const response = await getPostApi(Number(postId));
				const data = response.data;
				setPost(data);
				setUserId(data.user.userId);
				setUserName(data.user.nickname);
			} catch (error) {
				console.error('Error fetching post data:', error);
			}
		};

		getPost();
	}, [postId]);

	const handleUserClick = () => {
		// 로컬 스토리지에서 사용자 ID 가져오기
		const myUserId = localStorage.getItem('id'); // 로컬 스토리지에 저장된 사용자 ID를 가져옴

		if (String(myUserId) === String(post?.user.userId)) {
			// 내 게시물인 경우
			nav('/mypage');
		} else {
			// 다른 유저의 게시물인 경우
			nav(`/users/${post?.user.userId}`);
		}
	};

	const handleLikeCommentOpen = (tab: 'likes' | 'comments') => {
		setActiveTab(tab); // 클릭한 버튼에 따라 activeTab 설정
		setIsLikeCommentBottomSheetOpen(true);
	};

	const likeCommentbottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isLikeCommentBottomSheetOpen,
		isHandlerVisible: true,
		Component: LikeCommentBottomSheetContent,
		onCloseBottomSheet: () => {
			setIsLikeCommentBottomSheetOpen(false);
		},
		componentProps: {
			tab: activeTab,
			likeCount: post?.likeCount,
			commentCount: post?.commentCount,
		},
	};

	const handleLikeClick = async () => {
		try {
			const response = await request.patch<UpdatePostLikeResponse>(`/posts/${postId}/like`);
			if (response.isSuccess) {
				console.log('Successed updating like');
			} else {
				console.error('Failed updating like');
			}
		} catch (error) {
			console.error('Error updating like:', error);
		}
	};

	return (
		<OODDFrame>
			<TopBar LeftButtonSrc={Left} />
			{!post || isLoading ? (
				<Loading />
			) : (
				<PostContainer>
					<PostInfoContainer>
						<UserInfo onClick={handleUserClick}>
							<UserProfile>{post.user && <img src={post.user?.profilePictureUrl} alt="profileImg" />}</UserProfile>
							<UserName>
								<StyledText $textTheme={{ style: 'body2-medium', lineHeight: 1 }} color={theme.colors.black}>
									{userName}
								</StyledText>
							</UserName>
						</UserInfo>
						<MenuBtn onClick={onClickMenu}>
							<img src={More} alt="more" />
						</MenuBtn>
					</PostInfoContainer>

					{post.content && (
						<Content>
							<StyledText
								$textTheme={{ style: 'body6-light', lineHeight: 1.2 }}
								color={theme.colors.black}
								style={{ opacity: '50%' }}
							>
								{post.content}
							</StyledText>
						</Content>
					)}

					{post.postImages && <ImageSwiper images={post.postImages.map((image) => image.url)} />}

					<IconRow>
						<IconWrapper onClick={handleLikeClick}>
							<img src={Like} alt="like" />
							<span onClick={() => handleLikeCommentOpen('likes')}>{post.likeCount ?? 0}</span>
						</IconWrapper>
						<IconWrapper onClick={() => handleLikeCommentOpen('comments')}>
							<img src={Message} alt="message" />
							<span>{post.commentCount ?? 0}</span>
						</IconWrapper>
					</IconRow>

					<ClothingInfoList className="post-mode">
						{post.postClothings?.map((clothingObj, index) => (
							<ClothingInfoItem key={index} clothingObj={clothingObj} hasRightMargin={true} />
						))}
					</ClothingInfoList>
				</PostContainer>
			)}
			<NavBar />
			<BottomSheet {...likeCommentbottomSheetProps} />
		</OODDFrame>
	);
};

export default PostBase;
