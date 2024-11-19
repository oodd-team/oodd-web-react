import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import theme from '../../styles/theme';

import { postIdAtom, userIdAtom, userNameAtom } from '../../recoil/Post/PostAtom';

import { OODDFrame } from '../Frame/Frame';
import { StyledText } from '../Text/StyledText';
import TopBar from '../TopBar';
import NavBar from '../NavBar';
import BottomSheet from '../BottomSheet';
import ClothingInfoItem from '../ClothingInfoItem';
import ImageSwiper from './ImageSwiper';
import LikeCommentBottomSheetContent from './LikeCommentBottomSheetContent';

import {
	PostContainer,
	PostInfoContainer,
	UserProfile,
	UserName,
	MenuBtn,
	PostContentContainer,
	BaseContent,
	Content,
	ShowMoreButton,
	BaseImage,
	IconRow,
	IconWrapper,
	ClothingInfoList,
} from './styles';

import Left from '../../assets/arrow/left.svg';
import Like from '../../assets/default/like.svg';
import LikeFill from '../../assets/default/like-fill.svg';
import Message from '../../assets/default/message.svg';
import More from '../../assets/default/more.svg';

import { BottomSheetProps } from '../BottomSheet/dto';
import { PostBaseProps } from './dto';
import { GetPostDetailResponse } from '../../apis/post/dto';
import { GetUserResponse } from '../../apis/user/dto';
import { UpdatePostLikeResponse } from '../../apis/post-like/dto';

import request from '../../apis/core';
import { getPostApi } from '../../apis/post';

const PostBase: React.FC<PostBaseProps> = ({ onClickMenu }) => {
	const { postId } = useParams<{ postId: string }>();
	const [, setPostId] = useRecoilState(postIdAtom);
	const [post, setPost] = useState<GetPostResponse['data']>();
	const [, setUserId] = useRecoilState<number>(userIdAtom);
	const [userName, setUserName] = useRecoilState<string>(userNameAtom);
	const [timeAgo, setTimeAgo] = useState<string | null>();
	const [showFullText, setShowFullText] = useState(false);
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
				setTimeAgo(dayjs(data.createdAt).locale('ko').fromNow());
			} catch (error) {
				console.error('Error fetching post data:', error);
			}
		};

		getPost();
	}, [postId]);

	const handleUserClick = () => {
		if (post?.isPostWriter) {
			// 내 게시물인 경우
			nav('/mypage');
		} else {
			// 다른 유저의 게시물인 경우
			nav(`/users/${post?.user.userId}`);
		}
	};

	const toggleTextDisplay = () => {
		setShowFullText((prev) => !prev);
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

			<PostContainer>
				<PostInfoContainer>
					<UserProfile onClick={handleUserClick}>
						{post?.user && <img src={post.user.profilePictureUrl} alt="profileImg" />}
					</UserProfile>
					<UserName onClick={handleUserClick} $textTheme={{ style: 'body2-medium' }} color={theme.colors.black}>
						{userName}
					</UserName>
					<StyledText className="timeAgo" $textTheme={{ style: 'caption2-regular' }} color={theme.colors.gray3}>
						{timeAgo}
					</StyledText>
					<MenuBtn onClick={onClickMenu}>
						<img src={More} alt="more" />
					</MenuBtn>
				</PostInfoContainer>

				<PostContentContainer>
					{!post ? (
						<BaseContent />
					) : (
						<>
							<Content
								onClick={toggleTextDisplay}
								showFullText={showFullText}
								$textTheme={{ style: 'body4-light' }}
								color={theme.colors.black}
							>
								{post.content}
							</Content>
							<ShowMoreButton
								onClick={toggleTextDisplay}
								$textTheme={{ style: 'body4-light' }}
								color={theme.colors.gray3}
							>
								{showFullText ? '간략히 보기' : '더 보기'}
							</ShowMoreButton>
						</>
					)}
				</PostContentContainer>

				{!post ? <BaseImage /> : <ImageSwiper images={post.postImages.map((image) => image.url)} />}

				<IconRow>
					<IconWrapper onClick={handleLikeClick}>
						{post?.isPostLike ? <img src={LikeFill} alt="like" /> : <img src={Like} alt="like" />}
						<span onClick={() => handleLikeCommentOpen('likes')}>{post?.likeCount ?? 0}</span>
					</IconWrapper>
					<IconWrapper onClick={() => handleLikeCommentOpen('comments')}>
						<img src={Message} alt="message" />
						<span>{post?.commentCount ?? 0}</span>
					</IconWrapper>
				</IconRow>

				<ClothingInfoList className="post-mode">
					{post?.postClothings?.map((clothingObj, index) => (
						<ClothingInfoItem key={index} clothingObj={clothingObj} hasRightMargin={true} />
					))}
				</ClothingInfoList>
			</PostContainer>

			<NavBar />
			<BottomSheet {...likeCommentbottomSheetProps} />
		</OODDFrame>
	);
};

export default PostBase;
