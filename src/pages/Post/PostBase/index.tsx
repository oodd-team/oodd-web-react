import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import 'dayjs/locale/ko';

import theme from '@styles/theme';

import { getPostDetailApi } from '@apis/post';
import { togglePostLikeStatusApi } from '@apis/post-like';
import { postIdAtom, userAtom, isPostRepresentativeAtom } from '@recoil/Post/PostAtom';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import Left from '@assets/arrow/left.svg';
import Message from '@assets/default/message.svg';
import More from '@assets/default/more.svg';

import Like from '@components/Icons/Like';

import BottomSheet from '@components/BottomSheet';
import ClothingInfoItem from '@components/ClothingInfoItem';
import { OODDFrame } from '@components/Frame/Frame';
import NavBar from '@components/NavBar';
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
	ContentSkeleton,
	Content,
	ShowMoreButton,
	ImageSkeleton,
	IconRow,
	IconWrapper,
	Icon,
	ClothingInfoList,
} from './styles';

const PostBase: React.FC<PostBaseProps> = ({ onClickMenu }) => {
	const [, setPostId] = useRecoilState(postIdAtom);
	const [post, setPost] = useState<GetPostDetailResponse['data']>();
	const [user, setUser] = useRecoilState(userAtom);
	const [, setIsPostRepresentative] = useRecoilState(isPostRepresentativeAtom);
	const [timeAgo, setTimeAgo] = useState<string | null>();
	const [isTextOverflowing, setIsTextOverflowing] = useState(false);
	const [showFullText, setShowFullText] = useState(false);
	const [isLikeCommentBottomSheetOpen, setIsLikeCommentBottomSheetOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>('likes'); // activeTab state

	const { postId } = useParams<{ postId: string }>();
	const userId = getCurrentUserId();

	const nav = useNavigate();

	const handleLikeCommentOpen = (tab: 'likes' | 'comments') => {
		setActiveTab(tab); // 클릭한 버튼에 따라 activeTab 설정
		setIsLikeCommentBottomSheetOpen(true);
	};

	const handleUserClick = () => {
		if (post?.isPostWriter) {
			// 내 게시물인 경우
			nav(`/profile/${userId}`);
		} else {
			// 다른 유저의 게시물인 경우
			nav(`/users/${post?.user.id}`);
		}
	};

	const contentRef = useRef<HTMLDivElement>(null);

	const toggleTextDisplay = () => {
		setShowFullText((prev) => !prev);
	};

	// 게시글 좋아요 누르기/취소하기 api
	const togglePostLikeStatus = async () => {
		if (!post || !postId) return;

		const prevPost = { ...post }; // 현재 상태 저장
		setPost({
			...post,
			isPostLike: !post.isPostLike,
			postLikesCount: post.isPostLike ? post.postLikesCount - 1 : post.postLikesCount + 1,
		}); //사용자가 좋아요를 누르면 먼저 클라이언트에서 post 상태를 변경(낙관적 업데이트)

		try {
			const response = await togglePostLikeStatusApi(Number(postId));
			setPost({
				...post,
				isPostLike: response.data.isPostLike,
				postLikesCount: response.data.postLikesCount,
			}); // 서버로 요청 후 성공하면 그대로 유지
		} catch (error) {
			console.error('Error toggling like status:', error);
			setPost(prevPost); // 실패하면 원래 상태로 롤백
		}
	};

	useEffect(() => {
		setPostId(Number(postId));

		// 게시글 정보 가져오기
		const getPost = async () => {
			try {
				const response = await getPostDetailApi(Number(postId));
				const data = response.data;
				setPost(data);
				setUser(data.user);
				setIsPostRepresentative(data.isRepresentative);
				setTimeAgo(dayjs(data.createdAt).locale('ko').fromNow());
			} catch (error) {
				console.error('Error fetching post data:', error);
			}
		};

		getPost();
	}, [postId]);

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

	return (
		<OODDFrame>
			<TopBar LeftButtonSrc={Left} />

			<PostLayout>
				<PostContainer>
					<PostInfoContainer>
						<UserProfile onClick={handleUserClick}>
							{post?.user && <img src={post.user.profilePictureUrl} alt="profileImg" />}
						</UserProfile>
						<UserName
							onClick={handleUserClick}
							$textTheme={{ style: 'body2-medium' }}
							color={theme.colors.text.primary}
						>
							{user.nickname}
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

					{!post ? <ImageSkeleton /> : <ImageSwiper images={post.postImages.map((image) => image.url)} />}

					{post?.postClothings && (
						<ClothingInfoList className="post-mode">
							{post.postClothings.map((clothingObj, index) => (
								<ClothingInfoItem key={index} clothingObj={clothingObj} />
							))}
						</ClothingInfoList>
					)}

					<IconRow>
						<IconWrapper>
							<Icon onClick={togglePostLikeStatus}>
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
						{!post ? (
							<ContentSkeleton />
						) : (
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
