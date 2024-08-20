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

const UserInfo: React.FC = React.memo(() => {
    const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useRecoilState(isBottomSheetOpenState);
    const [interested, setInterested] = useState<boolean | undefined>(undefined);
    const [friend, setFriend] = useRecoilState(friendState);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const [modalContent, setModalContent] = useState(''); // 모달 내용

    if (!userDetails) return null; // 사용자의 정보가 없으면 아무것도 렌더링하지 않음

    const { id, nickname, bio, userImg } = userDetails;
    const truncatedBio = (bio && bio.length > 50) ? bio.substring(0, 50) + '...' : bio;

    useEffect(() => {
        if (!id) return;

        const storedUserDetails = localStorage.getItem(`userDetails_${id}`);
        if (storedUserDetails) {
            try {
                const parsedDetails = JSON.parse(storedUserDetails);
                setInterested(parsedDetails.isInterested || false);
                setFriend(parsedDetails.isFriend || false);

                setUserDetails(prevDetails => {
                    if (!prevDetails || prevDetails.isInterested === parsedDetails.isInterested) {
                        return prevDetails;
                    }
                    return {
                        ...prevDetails,
                        isInterested: parsedDetails.isInterested || false,
                        isFriend: parsedDetails.isFriend || false,
                    };
                });
            } catch (error) {
                console.error('JSON 파싱 오류:', error);
            }
        }
    }, [id, setUserDetails, setFriend]);

    const userId = localStorage.getItem('id');

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

            // 성공적으로 응답이 오면 모달을 띄우기
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
                        <Button $color="white" $backgroundcolor="#000">
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
                    <LongButton>
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


