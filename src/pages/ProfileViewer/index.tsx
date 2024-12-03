import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import UserInfo from './UserInfo';
import PostItem from '../../components/PostItem';
import TopBar from '../../components/TopBar';
import { StyledText } from '../../components/Text/StyledText';
import { OODDFrame } from '../../components/Frame/Frame';
import Loading from '../../components/Loading';
import OptionsBottomSheet from '../../components/BottomSheet/OptionsBottomSheet';

import theme from '../../styles/theme';

import { UserInfoAtom } from '../../recoil/ProfileViewer/userDetailsAtom';

import { ProfileViewerContainer, CounterContainer, Count, PostListContainer } from './style';

import MoreSvg from '../../assets/default/more.svg';
import BackSvg from '../../assets/arrow/left.svg';
import imageBasic from '../../assets/default/defaultProfile.svg';

import { getUserInfoApi } from '../../apis/user';
import { getUserPostListApi } from '../../apis/post';
import { OptionsBottomSheetProps } from '../../components/BottomSheet/OptionsBottomSheet/dto';
import { UserPostSummary } from '../../apis/post/dto';

const ProfileViewer: React.FC = () => {
	const { userId } = useParams<{ userId: string }>();
	const userIdAsNumber = Number(userId);

	// 전역 상태로 유저 정보 관리
	const [userDetails, setUserDetails] = useRecoilState(UserInfoAtom);

	// 지역 상태로 게시글 관리
	const [posts, setPosts] = useState<UserPostSummary[]>([]);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// 유저 정보 가져오기
	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const response = await getUserInfoApi(userIdAsNumber);
				setUserDetails({
					...response.data,
					profilePictureUrl: response.data.profilePictureUrl || imageBasic,
				});
			} catch (error) {
				console.error('사용자 정보 조회 실패:', error);
			}
		};
		getUserInfo();
	}, [userIdAsNumber, setUserDetails]);

	// 게시글 가져오기
	useEffect(() => {
		const getUserPostList = async () => {
			try {
				const response = await getUserPostListApi(1, 10, userIdAsNumber);
				setPosts(response.data.post);
			} catch (error) {
				console.error('게시글 조회 실패:', error);
				setPosts([]);
			} finally {
				setIsLoading(false);
			}
		};
		getUserPostList();
	}, [userIdAsNumber]);

	// 로딩 화면 표시
	if (isLoading) {
		return <Loading />;
	}

	const representativePosts = posts.filter((post) => post.isRepresentative); // 대표 게시물
	const otherPosts = posts.filter((post) => !post.isRepresentative);

	const handleBottomSheetOpen = () => {
		setIsBottomSheetOpen(true);
	};

	const optionsBottomSheetProps: OptionsBottomSheetProps = {
		domain: 'user',
		targetId: {
			userId: userIdAsNumber || -1,
		},
		targetNickname: userDetails?.nickname || '알 수 없음',
		isBottomSheetOpen: isBottomSheetOpen,
		onClose: () => setIsBottomSheetOpen(false),
	};

	const counts = [
		{ label: 'OOTD', value: posts.length || 0 },
		{ label: '좋아요', value: posts.reduce((sum, post) => sum + post.postLikesCount, 0) || 0 },
	];

	return (
		<OODDFrame>
			<TopBar RightButtonSrc={MoreSvg} LeftButtonSrc={BackSvg} onRightClick={handleBottomSheetOpen} />
			<ProfileViewerContainer>
				<UserInfo />
				<CounterContainer>
					{counts.map((count, index) => (
						<Count key={index}>
							<StyledText $textTheme={{ style: 'caption2-medium' }} color={theme.colors.gray3}>
								{count.label}
							</StyledText>
							<StyledText $textTheme={{ style: 'body2-medium' }} color={theme.colors.gray3}>
								{count.value}
							</StyledText>
						</Count>
					))}
				</CounterContainer>
				<PostListContainer>
					{representativePosts.map((post) => (
						<PostItem key={post.postId} post={post} isMyPost={false} />
					))}
					{otherPosts.map((post) => (
						<PostItem key={post.postId} post={post} isMyPost={false} />
					))}
				</PostListContainer>
				<OptionsBottomSheet {...optionsBottomSheetProps} />
			</ProfileViewerContainer>
		</OODDFrame>
	);
};

export default ProfileViewer;
