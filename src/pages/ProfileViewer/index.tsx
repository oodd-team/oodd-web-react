import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import PostItem from "./components/PostItem";
import { mockUserData } from "./MocData"; // Mock 데이터 임포트
import { ProfileViewerContainer, Vector, CounterContainer, Count,  PostListContainer } from "./style";
import { StyledText } from "../../components/Text/StyledText";
import theme from '../../styles/theme';
import { OODDFrame } from "../../components/Frame/Frame";
import { useRecoilState } from 'recoil';
import { userDetailsState } from '../../recoil/atoms'; // Recoil atom 임포트
import TopBar from "../../components/TopBar";
import MoreSvg from '../../assets/ProfileViewer/moreIcon.svg'
import BackSvg from '../../assets/ProfileViewer/backIcon.svg'
import BottomSheet from "../../components/BottomSheet";
import BottomSheetMenu from "../../components/BottomSheetMenu";
import { mainMenuItems, reportMenuItems } from "./dto";

const ProfileViewer: React.FC = () => {
    const { userId } = useParams<{ userId: string }>(); // URL 파라미터에서 userId 가져오기
    const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // Local state 사용
    const [activeBottomSheet, setActiveBottomSheet] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setUserDetails(mockUserData); // // Mock 데이터 사용, 추후 실제 API 호출로 대체
            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        };
        fetchUserDetails();
    }, [userId, setUserDetails]); // userId가 변경될 때마다 호출

    if (!userDetails) {
        return <div>Loading...</div>; // 데이터 로딩 중 표시
    }

    // 고정 게시물과 나머지 게시물 구분
    const fixedPostIds = userDetails.fixedPostIds || []; // undefined일 경우 빈 배열
    const posts = userDetails.posts || []; // undefined일 경우 빈 배열

    // fixedPostIds(사용자가 고정한 게시물의 ID 목록)와 posts가 정의된 경우에만 필터링 (사용자가 게시물을 고정했을 경우)
    const fixedPosts = fixedPostIds.length > 0 ? posts.filter(post => fixedPostIds.includes(post.id)) : [];
    // fixedPostIds.length > 0 조건을 통해 고정된 게시물이 있는지 확인, 모든 게시물 중 fixedPostIds에 포함된 게시물만 필터링하여 fixedPosts 배열에 저장
    const otherPosts = posts.filter(post => !fixedPostIds.includes(post.id));
    // fixedPostIds에 포함되지 않은 게시물만 필터링하여 otherPosts 배열에 저장

    const handleOpenBottomSheet = (type: string) => {
        setActiveBottomSheet(type);
        setIsBottomSheetOpen(true);
    }; // 타입을 지정해서 경우에 따라 다른 bottomsheets가 올라오도록 함. 타입을 구분하지 않았을 때 모든 bottomsheets가 함께 렌더링 됨.

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
        setActiveBottomSheet(null);
    };

    return (
        <OODDFrame>
            <ProfileViewerContainer>
                <TopBar 
                text={mockUserData.userId}
                kebabMenuSrc={MoreSvg} // KebabMenuButton src의 Optional prop
                BackIcon={BackSvg} // BackButton src의 Optional prop
                onKebabClick={() => handleOpenBottomSheet('main')} // 신고하기, 차단하기 bottomsheets
                />
                <UserInfo />
                <Vector />
                <CounterContainer>
                    <Count>
                        <StyledText $textTheme={{ style: 'body6-light', lineHeight: 1 }} color={theme.colors.gray4}>
                            OODD
                        </StyledText>
                        <StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.gray4}>
                            {userDetails.postsCount || 0}
                        </StyledText>
                    </Count>
                    <Count>
                        <StyledText $textTheme={{ style: 'body6-light', lineHeight: 1 }} color={theme.colors.gray4}>
                            좋아요
                        </StyledText>
                        <StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.gray4}>
                            {userDetails.likesCount || 0}
                        </StyledText>
                    </Count>
                </CounterContainer>
                <PostListContainer>
                    {fixedPosts.length > 0 && fixedPosts.map(post => (
                        <PostItem key={post.id} post={post} isFixed={true} />
                    ))}
                    {otherPosts.length > 0 && otherPosts.map(post => (
                        <PostItem key={post.id} post={post} isFixed={false} />
                    ))}
                </PostListContainer>
                {isBottomSheetOpen && activeBottomSheet === 'main' && (
                <BottomSheet
                    isOpenBottomSheet={isBottomSheetOpen}
                    isBackgroundDimmed={true}
                    onCloseBottomSheet={handleCloseBottomSheet}
                    Component={() => (
                        <BottomSheetMenu items={mainMenuItems(handleOpenBottomSheet)} marginBottom="4rem" />
                    )}
                /> )}
                {isBottomSheetOpen && activeBottomSheet === 'report' && (
                <BottomSheet
                    isOpenBottomSheet={isBottomSheetOpen}
                    isBackgroundDimmed={true}
                    onCloseBottomSheet={handleCloseBottomSheet}
                    Component={() => (
                        <BottomSheetMenu items={reportMenuItems} marginBottom="4rem" />
                    )}
                /> )}
            </ProfileViewerContainer>
        </OODDFrame>
    );
};

export default ProfileViewer;











