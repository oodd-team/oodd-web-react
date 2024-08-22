import React, { useEffect, useState } from "react";
import { UserDetails, UserInfoContainer, UserProfile, Bio, UserImg, ButtonContainer, Button, LongButton, Icon } from "./styles";
import { useRecoilState } from 'recoil';
import { userDetailsState, isBottomSheetOpenState, friendState } from '../../../../recoil/atoms';
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import HeartSvg from '../../../../assets/ProfileViewer/heart.svg';
import StatSvg from '../../../../assets/ProfileViewer/star.svg';
import MsgSvg from '../../../../assets/ProfileViewer/message_send.svg';
import RequestComponent from "../RequestComponent";
import BottomSheet from "../../../../components/BottomSheet";
import request from "../../../../apis/core";
import { InterestDto } from "./InterestDto";
import { UserInfoProps } from "../../dto";
import Modal from '../../../../components/Modal';
import { OpponentInfoAtom } from "../../../../recoil/OpponentInfo";
import { UserInfoDto } from "../../ResponseDto/UserInfoDto";
import { ChatRoomDto, Opponent } from "../../../Chats/RecentChat/dto";
import { useNavigate } from "react-router-dom";


const UserInfo: React.FC = React.memo(() => {
    const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useRecoilState(isBottomSheetOpenState);
    const [interested, setInterested] = useState<boolean | undefined>(undefined);
    const [friend, setFriend] = useRecoilState(friendState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [, setOpponentInfo] = useRecoilState(OpponentInfoAtom);
    const nav = useNavigate();

    if (!userDetails) return null;

    const { id, nickname, bio, userImg } = userDetails;
    const truncatedBio = (bio && bio.length > 50) ? bio.substring(0, 50) + '...' : bio;
    const userId = localStorage.getItem('id');

    // 사용자 정보 조회 및 상태 업데이트 함수
    const fetchUserInfo = async () => {
        try {
            const response = await request.get<UserInfoDto>(`/users/${id}`);
            console.log("??",response);
            const updatedUserDetails: UserInfoProps = {
                ...userDetails,
                isInterested: interested, // 현재 상태 유지
            };
            console.log("hey",userDetails);
            setFriend(response.result.isFriend);
            setUserDetails(updatedUserDetails);
            setInterested(interested); // 현재 상태 유지
        } catch (error) {
            console.error('사용자 정보 조회 오류:', error);
        }
    };

    // 컴포넌트가 마운트되거나 userDetails가 변경될 때 사용자 정보를 조회
    useEffect(() => {
        fetchUserInfo();
    }, [id]);

    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };

    const handleOpenModal = (message: string) => {
        setModalContent(message);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleMessageClick = async () => {
        try {
            // 사용자 정보 조회
            const response = await request.get<UserInfoDto>(`/users/${id}`);
            const User: Opponent = {
                id: response.result.id,
                nickname: response.result.nickname,
                profilePictureUrl: response.result.profilePictureUrl,
                name: response.result.name
            };

            console.log(User);

            // 본인이 참여하고 있는 채팅 리스트 조회
            const chatRoomResponse = await request.get<{ isSuccess: boolean, code: number, message: string, result: ChatRoomDto[] }>(`/chat-rooms/${userId}`);

            let roomId: number | null = null;

            console.log(chatRoomResponse); // chatRoomResponse가 무엇인지 확인하기 위해 로그 출력

            // chatRoomResponse.result 배열에서 User.id와 일치하는 채팅방 찾기
            if (Array.isArray(chatRoomResponse.result)) {
                chatRoomResponse.result.forEach(room => {
                    if (room.opponent.id === User.id) {
                        roomId = room.id; // 일치하는 채팅방 ID 설정
                    }
                });
            } else {
                console.error("chatRoomResponse.result is not an array:", chatRoomResponse.result);
            }
            if (roomId !== null) {
                // 채팅방이 존재하면 해당 채팅방으로 이동
                nav(`/chats/${roomId}`);
            } else {
                // 채팅방이 존재하지 않을 경우 처리
                console.log('이 상대방과 관련된 채팅방이 존재하지 않습니다.');
            }

            // 상대방 정보 업데이트
            setOpponentInfo(User);

        } catch (error) {
            console.error('메세지 보내기 오류:', error);
            alert('사용자 정보를 불러오지 못했습니다.');
        }
    };

    const handleInterestedClick = async () => {
        try {
            const response = await request.patch<InterestDto>(`/user-interests`, {
                userId: userId,
                friendId: id
            });

            const isInterested = response.result.status === 'activated';
            const updatedUserDetails: UserInfoProps = {
                ...userDetails,
                isInterested,
            };

            localStorage.setItem(`userDetails_${id}`, JSON.stringify(updatedUserDetails));
            setUserDetails(updatedUserDetails);
            setInterested(isInterested);

            handleOpenModal(isInterested ? `${userDetails.nickname}님을 관심 친구로 등록했습니다!` : '관심 친구 등록이 해제되었습니다.');
        } catch (error) {
            console.error('관심 친구 등록 오류:', error);
            alert('관심 친구 등록에 실패했습니다.');
        }
    };

    return (
        <UserInfoContainer>
            <UserProfile>
                <UserImg $imgUrl={userImg} />
                <UserDetails>
                    <StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }}>
                        {nickname}
                    </StyledText>
                    <Bio>
                        <StyledText $textTheme={{ style: 'body4-light', lineHeight: 1 }} color={theme.colors.gray4}>
                            {truncatedBio}
                        </StyledText>
                    </Bio>
                </UserDetails>
            </UserProfile>
            <ButtonContainer>
                {!friend && !interested && (
                    <>
                        <Button $backgroundcolor="#000" onClick={handleOpenBottomSheet}>
                            <Icon src={HeartSvg} alt="heart icon" />
                            <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
                                친구 신청
                            </StyledText>
                        </Button>
                        <Button $backgroundcolor="white" onClick={handleInterestedClick}>
                            <Icon src={StatSvg} alt="star icon" />
                            <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>
                                관심 친구
                            </StyledText>
                        </Button>
                    </>
                )}
                {friend && !interested && (
                    <>
                        <Button $color="white" $backgroundcolor="#000"  onClick={handleMessageClick}>
                            <Icon src={MsgSvg} alt="message icon" />
                            <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
                                메세지 보내기
                            </StyledText>
                        </Button>
                        <Button $color="#000" $backgroundcolor="white" onClick={handleInterestedClick}>
                            <Icon src={StatSvg} alt="star icon" />
                            <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>
                                관심 친구
                            </StyledText>
                        </Button>
                    </>
                )}
                {friend && interested && (
                    <LongButton  onClick={handleMessageClick}>
                        <Icon src={MsgSvg} alt="message icon" />
                        <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
                            메세지 보내기
                        </StyledText>
                    </LongButton>
                )}
                {!friend && interested && (
                    <LongButton onClick={handleOpenBottomSheet}>
                        <Icon src={HeartSvg} alt="heart icon" />
                        <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
                            친구 신청
                        </StyledText>
                    </LongButton>
                )}
            </ButtonContainer>
            {isBottomSheetOpen && (
                <BottomSheet
                    isOpenBottomSheet={isBottomSheetOpen}
                    onCloseBottomSheet={handleCloseBottomSheet}
                    Component={() => (
                        <RequestComponent
                            userId={id}
                            nickname={nickname}
                            setFriend={setFriend}
                            setIsBottomSheetOpen={setIsBottomSheetOpen}
                            handleOpenModal={handleOpenModal}
                        />
                    )}
                />
            )}
            {isModalOpen && (
                <Modal
                    content={modalContent}
                    onClose={handleCloseModal}
                />
            )}
        </UserInfoContainer>
    );
});

export default UserInfo;