import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import theme from '@styles/theme';

import { usePostDetail } from '@apis/post';
import { togglePostLikeStatusApi } from '@apis/post-like';

import Left from '@assets/arrow/left.svg';
import Message from '@assets/default/message.svg';
import More from '@assets/default/more.svg';

import Like from '@components/Icons/Like';

import BottomSheet from '@components/BottomSheet';
import ClothingInfoItem from '@components/ClothingInfoItem';
import { OODDFrame } from '@components/Frame/Frame';
import NavBar from '@components/NavBar';
import Skeleton from '@components/Skeleton';
import { StyledText } from '@components/Text/StyledText';
import TopBar from '@components/TopBar';

import type { GetPostDetailResponse } from '@apis/post/dto';
import type { BottomSheetProps } from '@components/BottomSheet/dto';

import type { PostBaseProps } from './dto';

import ImageSwiper from './ImageSwiper/index';
import LikeCommentBottomSheetContent from './LikeCommentBottomSheetContent/index';

import {
	PostLayout,
	PostContainer,
	PostInfoContainer,
	UserProfile,
	UserName,
	MenuBtn,
	PostContentContainer,
	Content,
	ShowMoreButton,
	IconRow,
	IconWrapper,
	Icon,
	ClothingInfoList,
	UserNameWrapper,
	PostWrapper,
} from './styles';

const PostBase: React.FC<PostBaseProps> = ({ onClickMenu }) => {
	extend(relativeTime);
	const [isTextOverflowing, setIsTextOverflowing] = useState(false);
	const [showFullText, setShowFullText] = useState(false);
	const [isLikeCommentBottomSheetOpen, setIsLikeCommentBottomSheetOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>('likes'); // activeTab state

	const { postId } = useParams<{ postId: string }>();
	const contentRef = useRef<HTMLDivElement>(null);

	const { data, isLoading } = usePostDetail(Number(postId));
	const queryClient = useQueryClient();
	const post = data?.data;
	const user = post?.user;
	const timeAgo = dayjs(post?.createdAt).locale('ko').fromNow();

	const nav = useNavigate();

	const handleLikeCommentOpen = (tab: 'likes' | 'comments') => {
		setActiveTab(tab); // 클릭한 버튼에 따라 activeTab 설정
		setIsLikeCommentBottomSheetOpen(true);
	};

	const handleUserClick = () => {
		nav(`/profile/${post?.user.id}`);
	};

	const toggleTextDisplay = () => {
		setShowFullText((prev) => !prev);
	};

	// 게시글 좋아요 누르기/취소하기 api
	const { mutate: togglePostLikeStatus } = useMutation({
		mutationFn: () => togglePostLikeStatusApi(Number(postId)),
		onSuccess: () => {
			queryClient.setQueryData(['postDetail', Number(postId)], (oldData: GetPostDetailResponse | undefined) => {
				if (!oldData) return oldData;

				const newData = {
					...oldData,
					data: {
						...oldData.data,
						postLikesCount: oldData.data.postLikesCount + (oldData.data.isPostLike ? -1 : 1), // 기존 좋아요 개수를 토대로 증가/감소
						isPostLike: !oldData.data.isPostLike, // 좋아요 상태 변경
					},
				};
				console.log('newData', newData);

				return newData;
			});
		},
	});

	useEffect(() => {
		if (contentRef.current) {
			// 실제 높이와 줄 제한 높이 비교
			const { scrollHeight, clientHeight } = contentRef.current;
			setIsTextOverflowing(scrollHeight > clientHeight);
		}
	}, [post?.content]);

	const likeCommentbottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isLikeCommentBottomSheetOpen,
		isHandlerVisible: true,
		Component: LikeCommentBottomSheetContent,
		onCloseBottomSheet: () => {
			setIsLikeCommentBottomSheetOpen(false);
		},
		componentProps: {
			tab: activeTab,
			likeCount: post?.postLikesCount,
			commentCount: post?.postCommentsCount,
		},
	};

	if (isLoading) {
		return (
			<OODDFrame>
				<TopBar LeftButtonSrc={Left} onClickLeftButton={() => nav(-1)} />
				<PostInfoContainer>
					<UserProfile>
						<Skeleton width={2.5} height={2.5} borderRadius={2.5} />
					</UserProfile>
					<UserNameWrapper>
						<Skeleton width={6.25} height={1.25} />
					</UserNameWrapper>
				</PostInfoContainer>
				<PostWrapper>
					<Skeleton width="100%" height={40} />
				</PostWrapper>
			</OODDFrame>
		);
	}

	return (
		<OODDFrame>
			<TopBar LeftButtonSrc={Left} />

			<PostLayout>
				<PostContainer>
					<PostInfoContainer>
						<UserProfile onClick={handleUserClick}>
							{user && <img src={post.user.profilePictureUrl} alt="profileImg" />}
						</UserProfile>
						<UserName
							onClick={handleUserClick}
							$textTheme={{ style: 'body2-medium' }}
							color={theme.colors.text.primary}
						>
							{user?.nickname ?? '알수없음'}
						</UserName>
						<StyledText
							className="timeAgo"
							$textTheme={{ style: 'caption2-regular' }}
							color={theme.colors.text.tertiary}
						>
							{timeAgo}
						</StyledText>
						<MenuBtn onClick={onClickMenu}>
							<img src={More} alt="more" />
						</MenuBtn>
					</PostInfoContainer>

					{post && <ImageSwiper images={post.postImages.map((image) => image.url)} />}

					{post?.postClothings && (
						<ClothingInfoList className="post-mode">
							{post.postClothings.map((clothingObj, index) => (
								<ClothingInfoItem key={index} clothingObj={clothingObj} />
							))}
						</ClothingInfoList>
					)}

					<IconRow>
						<IconWrapper>
							<Icon onClick={() => togglePostLikeStatus()}>
								{post?.isPostLike ? <Like isFilled={true} color={theme.colors.brand.primary} /> : <Like />}
							</Icon>
							<span onClick={() => handleLikeCommentOpen('likes')}>{post?.postLikesCount ?? 0}</span>
						</IconWrapper>
						<IconWrapper onClick={() => handleLikeCommentOpen('comments')}>
							<Icon>
								<img src={Message} alt="message" />
							</Icon>
							<span>{post?.postCommentsCount ?? 0}</span>
						</IconWrapper>
					</IconRow>

					<PostContentContainer>
						{post && (
							<div>
								<Content
									ref={contentRef}
									onClick={toggleTextDisplay}
									$showFullText={showFullText}
									$textTheme={{ style: 'body4-light' }}
									color={theme.colors.text.primary}
								>
									{post.content}
								</Content>
								{isTextOverflowing && (
									<ShowMoreButton onClick={toggleTextDisplay} $textTheme={{ style: 'body4-light' }}>
										{showFullText ? '간략히 보기' : '더 보기'}
									</ShowMoreButton>
								)}
							</div>
						)}
					</PostContentContainer>
				</PostContainer>
			</PostLayout>

			<NavBar />
			<BottomSheet {...likeCommentbottomSheetProps} />
		</OODDFrame>
	);
};

export default PostBase;
