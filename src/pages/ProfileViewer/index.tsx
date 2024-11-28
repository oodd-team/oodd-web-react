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

import { CombineDataProps } from './CombineDataProps';

import { getUserInfoApi } from '../../apis/user';
import { getPostListApi } from '../../apis/post';
import { OptionsBottomSheetProps } from '../../components/BottomSheet/OptionsBottomSheet/dto';

const ProfileViewer: React.FC = () => {
	const { userId } = useParams<{ userId: string }>();
	const userIdAsNumber = Number(userId);
	const token = localStorage.getItem('new_jwt_token');

	const [userDetails, setUserDetails] = useRecoilState(UserInfoAtom);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

	useEffect(() => {
		const getUserInfoAndPostList = async () => {
			try {
				const [userInfoResponse, postsResponse] = await Promise.all([
					getUserInfoApi(userIdAsNumber),
					getPostListApi(1, 10, userIdAsNumber),
				]);

				console.log('게시물 리스트 조회 api 응답', postsResponse.data.post);
				const storedUserDetails = JSON.parse(localStorage.getItem(`userDetails_${userId}`) || '{}');
				const combinedData: CombineDataProps = {
					...userInfoResponse.data,
					status: storedUserDetails.status || 'blank', // 차단하기/ 해제하기 토글
					isFriend: userInfoResponse.data.isFriend,
					userImg: storedUserDetails.profilePictureUrl,

					posts: postsResponse.data.post,
					likesCount: postsResponse.data.post.reduce((totalLikes, post) => totalLikes + post.likeCount, 0), // 게시물들의 좋아요 총합
					postsCount: postsResponse.data.meta.total, // 게시물 총 수
				};

				setUserDetails(combinedData);
			} catch (error) {
				console.error('사용자 정보 조회 실패:', error);
				const defaultUserDetails: CombineDataProps = {
					userId: userIdAsNumber,
					nickname: '알 수 없음',
					bio: '',
					isFriend: false,
					userImg: imageBasic, // 기본 프로필 이미지
					posts: [],
					likesCount: 0,
					postsCount: 0,
					status: 'blank',
				};

				setUserDetails(defaultUserDetails);
			}
		};

		getUserInfoAndPostList();
	}, [userId, token, setUserDetails]);

	useEffect(() => {
		const storedUserDetails = localStorage.getItem(`userDetails_${userId}`);
		if (storedUserDetails) {
			setUserDetails(JSON.parse(storedUserDetails));
		}
	}, [setUserDetails, userId]);

	useEffect(() => {
		if (userDetails) {
			localStorage.setItem(`userDetails_${userId}`, JSON.stringify(userDetails));
		}
	}, [userDetails, userId]);

	if (!userDetails) {
		return <Loading />;
	} // 로딩 화면

	const posts = userDetails.posts || [];

	const representativePosts = posts.filter((post) => post.isRepresentative); // 대표 게시물인 것만 필터링
	const otherPosts = posts.filter((post) => !post.isRepresentative);
	const handleBottomSheetOpen = () => {
		setIsBottomSheetOpen(true);
	};

	const optionsBottomSheetProps: OptionsBottomSheetProps = {
		domain: 'user' as const, // 리터럴 타입으로 지정
		targetId: {
			userId: userIdAsNumber || -1,
		},
		targetNickname: userDetails.nickname || '알 수 없음',
		isBottomSheetOpen: isBottomSheetOpen,
		onClose: () => setIsBottomSheetOpen(false),
	};

	const counts = [
		{ label: 'OODD', value: userDetails.postsCount || 0 },
		{ label: '좋아요', value: userDetails.likesCount || 0 },
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
					{representativePosts.length > 0 &&
						representativePosts.map((post) => <PostItem key={post.postId} post={post} isMyPost={false} />)}
					{otherPosts.length > 0 &&
						otherPosts.map((post) => <PostItem key={post.postId} post={post} isMyPost={false} />)}
				</PostListContainer>
				<OptionsBottomSheet {...optionsBottomSheetProps} />
			</ProfileViewerContainer>
		</OODDFrame>
	);
};

export default ProfileViewer;
