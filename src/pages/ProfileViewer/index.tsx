import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import PostItem from "./components/PostItem";
import { mockUserData } from "./MocData"; // Mock 데이터 임포트
import { ProfileViewerContainer, HeaderContainer, UserID, Vector, MoreIcon, BackButton, CounterContainer, Count,  PostListContainer } from "./style";
import { StyledText } from "../../components/Text/StyledText";
import theme from '../../styles/theme';
import { OODDFrame } from "../../components/Frame/Frame";
import { useRecoilState } from 'recoil';
import { userDetailsState } from '../../recoil/atoms'; // Recoil atom 임포트

const ProfileViewer: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>(); // URL 파라미터에서 userId 가져오기
    const [userDetails, setUserDetails] = useRecoilState(userDetailsState);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Mock 데이터 사용
                setUserDetails(mockUserData); // 실제 API 호출로 대체
            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        };
        fetchUserDetails();
    }, [userId, setUserDetails]); // userId가 변경될 때마다 호출

    const handleGoBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    if (!userDetails) {
        return <div>Loading...</div>; // 데이터 로딩 중 표시
    }

    // 고정 게시물과 나머지 게시물 구분
    const fixedPostIds = userDetails.fixedPostIds || []; // undefined일 경우 빈 배열
    const posts = userDetails.posts || []; // undefined일 경우 빈 배열

    // fixedPostIds와 posts가 정의된 경우에만 필터링
    const fixedPosts = fixedPostIds.length > 0 ? posts.filter(post => fixedPostIds.includes(post.id)) : [];
    const otherPosts = posts.filter(post => !fixedPostIds.includes(post.id));

    return (
        <OODDFrame>
            <ProfileViewerContainer>
                <HeaderContainer>
                    <BackButton onClick={handleGoBack} />
                    <UserID>
                        <StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }} color={theme.colors.gray4}>
                            {userId}
                        </StyledText>
                    </UserID>
                    <MoreIcon />
                </HeaderContainer>
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
                    {/* 고정된 게시물이 있는 경우 렌더링 */}
                    {fixedPosts.length > 0 && fixedPosts.map(post => (
                        <PostItem key={post.id} post={post} isFixed={true} />
                    ))}
                    {/* 나머지 게시물 렌더링 */}
                    {otherPosts.length > 0 && otherPosts.map(post => (
                        <PostItem key={post.id} post={post} isFixed={false} />
                    ))}
                </PostListContainer>
            </ProfileViewerContainer>
        </OODDFrame>
    );
};

export default ProfileViewer;










