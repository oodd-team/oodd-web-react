import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./components/UserInfo";
import PostItem from "./components/PostItem";
import BottomSheet from "../../components/BottomSheet";
import BottomSheetMenu from "../../components/BottomSheetMenu";
import ConfirmationModal from "../../components/ConfirmationModal";
import ReportText from "./components/ReportText";
import TopBar from "../../components/TopBar";
import { StyledText } from "../../components/Text/StyledText";
import theme from '../../styles/theme';
import { OODDFrame } from "../../components/Frame/Frame";
import { useRecoilState } from 'recoil';
import { userDetailsState } from '../../recoil/atoms'; // Recoil atom 임포트
import MoreSvg from '../../assets/ProfileViewer/moreIcon.svg'
import BackSvg from '../../assets/ProfileViewer/backIcon.svg'
import { mainMenuItems, reportMenuItems, UserInfoProps } from "./dto";
import { ProfileViewerContainer, Vector, CounterContainer, Count, PostListContainer} from "./style";
import { UserInfoDto } from "./ResponseDto/UserInfoDto";
import request from "../../apis/core";
import { PostListDto } from "./ResponseDto/PostListDto";
import { BlockDto } from "./ResponseDto/BlockDto";

const ProfileViewer: React.FC = () => {
    const { userId } = useParams<{ userId: string }>(); // URL 파라미터에서 userId 가져오기
    const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // Local state 사용
    const [activeBottomSheet, setActiveBottomSheet] = useState<string | null>(null);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // ConfirmationModal 상태
    const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {}); // 확인 버튼 액션 처리
    const [isInputVisible, setIsInputVisible] = useState(false); // 입력창 표시 여부, 직접 입력 버튼이 눌렸을 때 표시

    const token = localStorage.getItem('jwt_token');
    const myid = localStorage.getItem('id');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await request.get<UserInfoDto>(`/users/${userId}`, {
                });
                console.log('사용자 정보 조회: ', response);
    
                const postsResponse = await request.get<PostListDto>(`posts?userId=${userId}`, {
                });
                console.log('게시물 리스트 조회:', postsResponse);
                // 각 사용자의 userId를 키로 사용하여 로컬 스토리지에서 가져오기
                const storedUserDetails = JSON.parse(localStorage.getItem(`userDetails_${userId}`) || '{}');
                const combinedData : UserInfoProps = {
                    ...response, 
                    status: storedUserDetails.status || 'blank',
                    posts: postsResponse.result.posts,
                    likesCount: postsResponse.result.totalLikes,
                    postsCount: postsResponse.result.totalPosts,
                    isInterested: storedUserDetails.isInterested || false, 
                    userImg: storedUserDetails.profilePictureUrl
                };
    
                setUserDetails(combinedData);
            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        };
    
        fetchUserDetails();
    }, [userId, token, setUserDetails]);
    
    
    useEffect(() => {
        const storedUserDetails = localStorage.getItem(`userDetails_${userId}`);
        if (storedUserDetails) {
            setUserDetails(JSON.parse(storedUserDetails));
        }
    }, [setUserDetails, userId]);
    
    

    useEffect(() => {
        if (userDetails) {
            // 각 사용자의 userId를 키로 사용하여 로컬 스토리지에 저장
            localStorage.setItem(`userDetails_${userId}`, JSON.stringify(userDetails));
        }
    }, [userDetails, userId]);
    
    if (!userDetails) {
        return <div>Loading...</div>; // 데이터 로딩 중 표시
    }

    // 고정 게시물과 나머지 게시물 구분
    const posts = userDetails.posts || []; // undefined일 경우 빈 배열

    // fixedPostIds(사용자가 고정한 게시물의 ID 목록)와 posts가 정의된 경우에만 필터링 (사용자가 게시물을 고정했을 경우)
    const representativePosts = posts.filter(post => post.isRepresentative);
    // fixedPostIds.length > 0 조건을 통해 고정된 게시물이 있는지 확인, 모든 게시물 중 fixedPostIds에 포함된 게시물만 필터링하여 fixedPosts 배열에 저장
    const otherPosts = posts.filter(post => !post.isRepresentative);
    // fixedPostIds에 포함되지 않은 게시물만 필터링하여 otherPosts 배열에 저장

    // 차단 버튼 활성화 여부 확인
    const isBlockingAllowed = myid !== userId;

    const handleOpenBottomSheet = (type: string) => {
        setActiveBottomSheet(type);
        setIsBottomSheetOpen(true);
    }; // 타입을 지정해서 경우에 따라 다른 bottomsheets가 올라오도록 함. 타입을 구분하지 않았을 때 모든 bottomsheets가 함께 렌더링 됨.

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
        setActiveBottomSheet(null);
    };

    const handleOpenConfirmationModal = () => {
        if (!isBlockingAllowed) {
            alert("자신을 차단할 수 없습니다."); // 자신을 차단하려고 할 때 경고 메시지 표시
            return;
        }

        setIsConfirmationModalOpen(true); // 모달 열기
        setConfirmAction(() => async () => {
            try {
                console.log(myid, userId);
                const response = await request.post<BlockDto>(`/block`, {
                    'userId': myid,
                    'friendId': Number(userId),
                    'action': 'toggle'
                });
                if (response.message === "OK") {
                    const newStatus = userDetails.status === 'blocked' ? 'unblocked' : 'blocked';
                    setUserDetails(prevState => ({
                        ...prevState!,
                        status: newStatus,
                    }));
                }
                console.log(response);
            } catch (error) {
                console.error('Failed to toggle block status', error);
            }
            handleCloseConfirmationModal();
        });
        setIsBottomSheetOpen(false);
    };

    const buttonText = userDetails.status === 'blocked' ? "차단 해제하기" : "차단하기";
    const confirmationMessage = userDetails.status === 'blocked'
        ? `${userDetails.nickname}님을 차단 해제하시겠습니까?`
        : `${userDetails.nickname}님을 정말로 차단하시겠습니까?`;
    
    const handleCloseConfirmationModal = () => {
        setIsConfirmationModalOpen(false); // ~ 하겠습니까? 모달 닫기
    };

    const handleDirectInput = () => { // reportMenuItem으로 전달 되어, 직접 입력의 action이 됨. 즉 직접 입력을 클릭하면 입력창 표시
        setIsInputVisible(true); // 입력창 표시
    };

    return (
        <OODDFrame>
            <ProfileViewerContainer>
                <TopBar 
                text={userDetails.nickname}
                RightButtonSrc={MoreSvg} 
                LeftButtonSrc={BackSvg}
                onRightClick={() => handleOpenBottomSheet('main')} // 신고하기, 차단하기 bottomsheets
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
                {representativePosts.length > 0 && representativePosts.map(post => (
                        <PostItem key={post.postId} post={post} isRepresentative={true} />
                    ))}
                    {otherPosts.length > 0 && otherPosts.map(post => (
                        <PostItem key={post.postId} post={post} isRepresentative={false} />
                    ))}
                </PostListContainer>
                {isBottomSheetOpen && activeBottomSheet === 'main' && (
                <BottomSheet
                    isOpenBottomSheet={isBottomSheetOpen}
                    isBackgroundDimmed={true}
                    onCloseBottomSheet={handleCloseBottomSheet}
                    Component={() => (
                        <BottomSheetMenu items={mainMenuItems(userDetails,handleOpenBottomSheet, handleOpenConfirmationModal)} marginBottom="4rem" />
                    )}
                /> )}
                {isBottomSheetOpen && activeBottomSheet === 'report' && (
                    <BottomSheet
                    isOpenBottomSheet={isBottomSheetOpen}
                    isBackgroundDimmed={true}
                    onCloseBottomSheet={handleCloseBottomSheet}
                    Component={() => (
                        <>
                            <BottomSheetMenu items={reportMenuItems(handleDirectInput)} marginBottom="1rem" />
                            {isInputVisible && (
                                <ReportText 
                                    onCloseBottomSheet={handleCloseBottomSheet} 
                                    setIsInputVisible={setIsInputVisible}
                                />
                            )}
                        </>
                    )}
                />
            )}
                {isConfirmationModalOpen && (
                    <ConfirmationModal
                        content={confirmationMessage}
                        isCancelButtonVisible={true}
                        confirm={{ text: buttonText, action: confirmAction }}
                        onCloseModal={handleCloseConfirmationModal}
                    />
                )}
            </ProfileViewerContainer>
        </OODDFrame>
    );
};

export default ProfileViewer;













