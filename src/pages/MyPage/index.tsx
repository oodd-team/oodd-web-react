import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ProfileContainer,
    Header,
    StatsContainer,
    Stat,
    StatNumber,
    StatLabel,
    PostsContainer,
    AddButton,
} from "./styles";
import { OODDFrame } from '../../components/Frame/Frame';
import NavbarProfile from '../../components/NavbarProfile';
import NavBar from '../../components/NavBar';
import ButtonSecondary from "./ButtonSecondary";
import PostItem from '../../components/PostItem';
import imageBasic from '../../assets/default/defaultProfile.svg';
import Loading from '../../components/Loading';
import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';
import button_plus from '../../assets/default/plus.svg';
import insta from '../../assets/default/insta.svg';
import photo from '../../assets/default/photo.svg';
import UserProfile from '../../components/UserProfile';

import { getUserPostListApi } from "../../apis/post";
import { UserPostSummary } from "../../apis/post/dto";
import { getUserInfoApi } from "../../apis/user";
import { UserInfoData } from "../../apis/user/dto";

const MyPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [posts, setPosts] = useState<UserPostSummary[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
    const navigate = useNavigate();

    const bottomSheetMenuProps: BottomSheetMenuProps = {
        items: [
            {
                text: '인스타 피드 가져오기',
                action: () => {
                    setIsBottomSheetOpen(false);
                    navigate('/insta-connect');
                },
                icon: insta,
            },
            {
                text: '사진 올리기',
                action: () => {
                    setIsBottomSheetOpen(false);
                    navigate('/image-select');
                },
                icon: photo,
            },
        ],
        marginBottom: '50px',
    };

    const bottomSheetProps: BottomSheetProps<BottomSheetMenuProps> = {
        isOpenBottomSheet: isBottomSheetOpen,
        isHandlerVisible: true,
        Component: BottomSheetMenu,
        componentProps: bottomSheetMenuProps,
        onCloseBottomSheet: () => {
            setIsBottomSheetOpen(false);
        },
    };

    const handleOpenSheet = () => {
        setIsBottomSheetOpen(true);
    };

    // 사용자 정보 조회 API
    const fetchUserInfo = async () => {
        try {
            const storedUserId = localStorage.getItem('my_id');
            if (!storedUserId) {
                console.error('User ID not found in localStorage');
                return;
            }

            const response = await getUserInfoApi(Number(storedUserId));
            setUserInfo(response.data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };
    
    // 게시물 리스트 조회 API
    const fetchPostList = async () => {
        try {
            const storedUserId = localStorage.getItem('my_id'); 
            if (!storedUserId) {
                console.error('User ID not found in localStorage');
                return;
            }

            const response = await getUserPostListApi(1, 10, Number(storedUserId)); 
            const { post, totalPostsCount } = response.data;

            setPosts(post); // 게시물 목록 상태 업데이트 (UserPostSummary 사용!)
            setTotalPosts(totalPostsCount); // 총 게시물 수 상태 업데이트
        } catch (error) {
            console.error('Error fetching user post list:', error); 
        } finally {
            setIsLoading(false); // 로딩 상태 종료
        }
    };

    useEffect(() => {
        fetchPostList();
        fetchUserInfo();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <OODDFrame>
            <ProfileContainer>
                <AddButton onClick={handleOpenSheet}>
                    <img src={button_plus} alt="Add" />
                </AddButton>
                <BottomSheet {...bottomSheetProps} />
                <NavbarProfile />
                <Header>
                    <UserProfile
                       userImg={userInfo?.profilePictureUrl || imageBasic}
                       nickname={userInfo?.nickname || '김아무개...'}
                       bio={userInfo?.bio || '소개글이 없습니다.'}
                    />
                </Header>
                <ButtonSecondary />
                <StatsContainer>
                    <Stat>
                        <StatLabel>OOTD</StatLabel>
                        <StatNumber>{totalPosts || 0}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>코멘트</StatLabel>
                        <StatNumber>
                            {posts.reduce((sum, post) => sum + (post.postCommentsCount || 0), 0)}
                        </StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>좋아요</StatLabel>
                        <StatNumber>
                            {posts.reduce((sum, post) => sum + (post.postLikesCount || 0), 0)}
                        </StatNumber>
                    </Stat>
                </StatsContainer>
                <PostsContainer>
                    {posts.length > 0 ? (
                        posts
                            .sort((a, b) => Number(b.isRepresentative) - Number(a.isRepresentative))
                            .map((post) => <PostItem key={post.postId} post={post} />)
                    ) : (
                        <p>게시물이 없습니다.</p>
                    )}
                </PostsContainer>
                <NavBar />
            </ProfileContainer>
        </OODDFrame>
    );
};

export default MyPage;
