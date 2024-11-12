import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

import theme from '../../styles/theme';
import { OODDFrame } from '../Frame/Frame';
import { StyledText } from '../Text/StyledText';
import TopBar from '../TopBar';
import NavBar from '../NavBar';
import BottomSheet from '../BottomSheet';
import { BottomSheetProps } from '../BottomSheet/dto';
import ImageSwiper from './ImageSwiper';
import ClothingInfoItem from '../ClothingInfoItem';
import LikeCommentBottomSheetContent from './LikeCommentBottomSheetContent';
import Loading from '../Loading';

import Left from '../../assets/arrow/left.svg';
import Like from '../../assets/default/like.svg';
//import LikeFill from '../../assets/default/like-fill.svg';
import Message from '../../assets/default/message.svg';
import More from '../../assets/default/more.svg';

import { useRecoilState } from 'recoil';
import { postIdAtom, userIdAtom, userNameAtom } from '../../recoil/Post/PostAtom';

import { PostBaseProps } from './dto';
import { GetPostDetailResponse } from '../../apis/Post/dto';
import { GetUserResponse } from '../../apis/user/dto';
import { UpdatePostLikeResponse } from '../../apis/post-like/dto';
import request from '../../apis/core';

const PostBase: React.FC<PostBaseProps> = ({ onClickMenu }) => {
	const [, setPostId] = useRecoilState(postIdAtom);
	const { postId } = useParams<{ postId: string }>();
	const [post, setPost] = useState<GetPostDetailResponse['result']>();
	const [user, setUser] = useState<GetUserResponse['result']>();
	const [, setUserId] = useRecoilState<number>(userIdAtom);
	const [userName, setUserName] = useRecoilState<string>(userNameAtom);
	const [isLoading, setIsLoading] = useState(false);
	const [isLikeCommentBottomSheetOpen, setIsLikeCommentBottomSheetOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>('likes'); // 추가: activeTab state

	const nav = useNavigate();

	useEffect(() => {
		// 게시글 정보 가져오기
		const fetchPost = async () => {
			setIsLoading(true);
			try {
				const response = await request.get<GetPostDetailResponse>(`/posts/${postId}`);
				if (response.isSuccess && response.result) {
					setPost(response.result);
					setPostId(response.result.postId);
					fetchUser(response.result.userId);
				} else {
					console.error('Failed to fetch post data');
				}
			} catch (error) {
				console.error('Error fetching post data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		// 유저 정보 가져오기
		const fetchUser = async (userId: number) => {
			setIsLoading(true);
			try {
				const response = await request.get<GetUserResponse>(`/users/${userId}`);
				if (response.isSuccess && response.result) {
					setUser(response.result);
					setUserId(response.result.id);
					setUserName(response.result.nickname || response.result.name);
				} else {
					console.error('Failed to fetch user data');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPost();
	}, [postId]);

	const handleUserClick = () => {
		// 로컬 스토리지에서 사용자 ID 가져오기
		const myUserId = localStorage.getItem('id'); // 로컬 스토리지에 저장된 사용자 ID를 가져옴

		if (String(myUserId) === String(post?.userId)) {
			// 내 게시물인 경우
			nav('/mypage');
		} else {
			// 다른 유저의 게시물인 경우
			nav(`/users/${post?.userId}`);
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
			likeCount: post?.likes,
			commentCount: post?.comments?.length,
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
							<UserProfile>{user && <img src={user?.profilePictureUrl} alt="profileImg" />}</UserProfile>
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

					<ImageSwiper images={post.photoUrls} />

					<IconRow>
						<IconWrapper onClick={handleLikeClick}>
							<img src={Like} alt="like" />
							<span onClick={() => handleLikeCommentOpen('likes')}>{post.likes ?? 0}</span>
						</IconWrapper>
						<IconWrapper onClick={() => handleLikeCommentOpen('comments')}>
							<img src={Message} alt="message" />
							<span>{post.comments?.length ?? 0}</span>
						</IconWrapper>
					</IconRow>

					<ClothingInfoList className="post-mode">
						{post.clothingInfo?.map((clothingObj, index) => (
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
