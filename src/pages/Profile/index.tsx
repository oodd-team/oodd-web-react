import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ProfileContainer,
  Header,
  StatsContainer,
  Stat,
  StatNumber,
  StatLabel,
  PostsContainer,
  AddButton,
  NoPostWrapper,
  Button,
} from './styles';
import NavbarProfile from './NavbarProfile';
import ButtonSecondary from './ButtonSecondary';
import { OODDFrame } from '@components/Frame/Frame';
import NavBar from '@components/NavBar';
import PostItem from '@components/PostItem';
import imageBasic from '@assets/default/defaultProfile.svg';
import Loading from '@components/Loading';
import UserProfile from '@components/UserProfile';
import { StyledText } from '@components/Text/StyledText';
import Modal from '@components/Modal';
import CommentBottomSheet from '@components/CommentBottomSheet';
import OptionsBottomSheet from '@components/BottomSheet/OptionsBottomSheet';
import { getUserPostListApi } from '@apis/post';
import { getUserInfoApi } from '@apis/user';
import { createMatchingApi } from '@apis/matching';
import { UserPostSummary } from '@apis/post/dto';
import { UserInfoData } from '@apis/user/dto';
import button_plus from '@assets/default/plus.svg';
import TopBar from '@components/TopBar';
import MoreSvg from '@assets/default/more.svg';
import BackSvg from '@assets/arrow/left.svg';
import theme from '@styles/theme';
import { getCurrentUserId } from '@utils/getCurrentUserId';
import { useRecoilState } from 'recoil';
import { OtherUserAtom } from '@recoil/util/OtherUser';

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const currentUserId = getCurrentUserId();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<UserPostSummary[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [, setUserInfo] = useState<UserInfoData | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // Boolean 변수
  const [isOptionsBottomSheetOpen, setIsOptionsBottomSheetOpen] = useState(false); // Boolean 변수
  const [isModalOpen, setIsModalOpen] = useState(false); // Boolean 변수
  const [modalContent, setModalContent] = useState('');
  const [otherUser, setOtherUser] = useRecoilState(OtherUserAtom); // 상태 변수
  const navigate = useNavigate();

  const isMyPage = currentUserId === otherUser?.id; // Boolean 변수

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserInfoApi(Number(userId));
        setUserInfo(response.data);
        setOtherUser(response.data);
        const postResponse = await getUserPostListApi(1, 10, Number(userId));
        setPosts(postResponse.data.post);
        setTotalPosts(postResponse.data.totalPostsCount);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId, setOtherUser]);

  const handleCreateMatching = async (message: string) => {
    // 이벤트 핸들러 변수명 수정
    if (!otherUser?.id) {
      handleModalOpen('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    const matchingRequestData = {
      requesterId: currentUserId,
      targetId: otherUser.id,
      message: message,
    };

    try {
      await createMatchingApi(matchingRequestData);
      handleModalOpen(`${otherUser.nickname}님에게 대표 OOTD와 \n한 줄 메세지를 보냈어요!`);
    } catch (error: any) {
      console.error('매칭 신청 오류:', error);
      handleModalOpen(error.response?.data?.message || '매칭 신청에 실패했습니다.');
    }
  };

  const handleModalOpen = (message: string) => {
    // 이벤트 핸들러 변수명 유지
    setIsBottomSheetOpen(false);
    setModalContent(message);
    setIsModalOpen(true);
  };

  if (isLoading) return <Loading />;

  return (
    <OODDFrame>
      <ProfileContainer>
        {isMyPage && (
          <AddButton onClick={() => navigate('/image-select')}>
            <img src={button_plus} alt="Add" />
          </AddButton>
        )}

        {isMyPage ? (
          <NavbarProfile />
        ) : (
          <TopBar
            RightButtonSrc={MoreSvg}
            LeftButtonSrc={BackSvg}
            onClickLeftButton={() => navigate(-1)}
            onClickRightButton={() => setIsOptionsBottomSheetOpen(true)}
          />
        )}

        <Header>
          <UserProfile
            userImg={otherUser?.profilePictureUrl || imageBasic}
            nickname={otherUser?.nickname || '알수없음'}
            bio={otherUser?.bio || '소개글이 없습니다.'}
          />
        </Header>

        {isMyPage ? <ButtonSecondary /> : <Button onClick={() => setIsBottomSheetOpen(true)}>매칭신청</Button>}

        <StatsContainer>
          <Stat>
            <StatLabel>OOTD</StatLabel>
            <StatNumber>{totalPosts || 0}</StatNumber>
          </Stat>
          {isMyPage && (
            <Stat>
              <StatLabel>코멘트</StatLabel>
              <StatNumber>{posts.reduce((sum, post) => sum + (post.postCommentsCount || 0), 0)}</StatNumber>
            </Stat>
          )}
          <Stat>
            <StatLabel>좋아요</StatLabel>
            <StatNumber>{posts.reduce((sum, post) => sum + (post.postLikesCount || 0), 0)}</StatNumber>
          </Stat>
        </StatsContainer>

        <PostsContainer>
          {posts.length > 0 ? (
            posts.map((post) => <PostItem key={post.id} post={post} />)
          ) : (
            <NoPostWrapper>
              <StyledText $textTheme={{ style: 'headline1-medium' }} color={theme.colors.gray[400]}>
                게시물이 없어요.
              </StyledText>
            </NoPostWrapper>
          )}
        </PostsContainer>

        {isMyPage && <NavBar />}

        <CommentBottomSheet
          isBottomSheetOpen={isBottomSheetOpen}
          commentProps={{
            content: `${otherUser?.nickname}님에게 대표 OOTD와 함께 전달될\n 한 줄 메세지를 보내보세요!`,
            sendComment: handleCreateMatching, // 이벤트 핸들러 변수명 수정
          }}
          handleCloseBottomSheet={() => setIsBottomSheetOpen(false)} // 이벤트 핸들러 변수명 유지
        />

        <OptionsBottomSheet
          domain="user"
          targetId={{ userId: otherUser?.id || -1 }}
          targetNickname={otherUser?.nickname || '알 수 없음'}
          isBottomSheetOpen={isOptionsBottomSheetOpen}
          onClose={() => setIsOptionsBottomSheetOpen(false)}
        />

        {isModalOpen && <Modal content={modalContent} onClose={() => setIsModalOpen(false)} />}
      </ProfileContainer>
    </OODDFrame>
  );
};

export default Profile;
