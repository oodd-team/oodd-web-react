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
import ImageSwiper from './ImageSwiper';
import LikeCommentBottomSheetContent from './LikeCommentBottomSheetContent';

import {
	PostContainer,
	PostInfoContainer,
	UserInfo,
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
//import LikeFill from '../../assets/default/like-fill.svg';
import Message from '../../assets/default/message.svg';
import More from '../../assets/default/more.svg';

import { BottomSheetProps } from '../BottomSheet/dto';
import { PostBaseProps } from './dto';
import { GetPostResponse } from '../../apis/Post/dto';
import { UpdatePostLikeResponse } from '../../apis/post-like/dto';

import request from '../../apis/core';
import { getPostApi } from '../../apis/Post';

// Post 더미 데이터
const dummyPost: GetPostResponse['data'] = {
	content:
		'이 카페 정말 추천해요! 분위기 최고예요.이 카페 정말 추천해요! 분위기 최고예요.이 카페 정말 추천해요! 분위기 최고예요.이 카페 정말 추천해요! 분위기 최고예요.이 카페 정말 추천해요! 분위기 최고예요.이 카페 정말 추천해요! 분위기 최고예요.이 카페 정말 추천해요! 분위기 최고예요.이 카페 정말 추천해요! 분위기 최고예요.이 카페 정말 추천해요! 분위기 최고예요.이 카페 정말 추천해요! 분위기 최고예요.',
	createdAt: '2024-11-13T09:00:00.000Z',
	postImages: [],
	postClothings: [
		{
			imageUrl:
				'https://www.google.com/url?sa=i&url=https%3A%2F%2Fkr.pinterest.com%2Fpin%2F574842339944777829%2F&psig=AOvVaw3AsWV91JuHeURHoTRXq4cR&ust=1731657476888000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDPsv6s24kDFQAAAAAdAAAAABAE',
			brandName: 'Brand A',
			modelName: 'Model A',
			modelNumber: '001',
			url: 'https://example.com/clothingA',
		},
	],
	user: {
		userId: 123,
		nickname: 'JaneDoe',
		profilePictureUrl:
			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fkr.pinterest.com%2Fpin%2F574842339944777829%2F&psig=AOvVaw3AsWV91JuHeURHoTRXq4cR&ust=1731657476888000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDPsv6s24kDFQAAAAAdAAAAABAE',
	},
	commentCount: 12,
	likeCount: 45,
	isPostLike: true,
	isPostWriter: true,
};

const PostBase: React.FC<PostBaseProps> = ({ onClickMenu }) => {
	const { postId } = useParams<{ postId: string }>();
	const [, setPostId] = useRecoilState(postIdAtom);
	const [post, setPost] = useState<GetPostResponse['data']>();
	const [, setUserId] = useRecoilState<number>(userIdAtom);
	const [userName, setUserName] = useRecoilState<string>(userNameAtom);
	const [showFullText, setShowFullText] = useState(false);
	const [isLikeCommentBottomSheetOpen, setIsLikeCommentBottomSheetOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>('likes'); // activeTab state

	const nav = useNavigate();

	useEffect(() => {
		setPostId(Number(postId));
		setPost(dummyPost);
		setUserId(dummyPost.user.userId);
		setUserName(dummyPost.user.nickname);
		/*
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
		*/
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
					<UserInfo onClick={handleUserClick}>
						<UserProfile>{post?.user && <img src={post.user.profilePictureUrl} alt="profileImg" />}</UserProfile>
						<UserName $textTheme={{ style: 'body2-medium' }} color={theme.colors.black}>
							{userName}
						</UserName>
					</UserInfo>
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
						<img src={Like} alt="like" />
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
