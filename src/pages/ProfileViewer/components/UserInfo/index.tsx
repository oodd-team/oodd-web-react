import React, { useState, useRef, useMemo } from "react";
import { UserDetails, UserInfoContainer, UserProfile, Bio, UserImg, ButtonContainer, Button, LongButton, Icon, RequestContainer, RequestMessage, Coment, MsgIcon, ComentContainer } from "./styles";
import { UserInfoProps } from "../../dto";
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import HeartSvg from '../../../../assets/ProfileViewer/heart.svg';
import StatSvg from '../../../../assets/ProfileViewer/star.svg';
import MsgSvg from '../../../../assets/ProfileViewer/message_send _gray.svg';
import BottomSheet from "../../../../components/BottomSheet";
import { mockUserData } from "../../MocData";

const UserInfo: React.FC<UserInfoProps> = React.memo(({ userId, userBio, userImg, isFriend, isInterested }) => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [requestMessage, setRequestMessage] = useState(`${mockUserData.userId}님에게 대표 OOTD와 함께 전달될 한 줄 메세지를 보내보세요!`);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const truncatedBio = userBio.length > 50 ? userBio.substring(0, 50) + '...' : userBio;

    const messageType = useMemo(() => {
        if (requestMessage === `${mockUserData.userId}님에게 대표 OOTD와 함께 전달될 한 줄 메세지를 보내보세요!`) {
            return 'initial';
        }
        return 'comment';
    }, [requestMessage]);

    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
        setRequestMessage(`${mockUserData.userId}님에게 대표 OOTD와 함께 전달될 한 줄 메세지를 보내보세요!`)
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };

    const handleInputFocus = () => {
        setRequestMessage(`${mockUserData.userId}님의 게시물에 대한 코멘트를 남겨보세요. 코멘트는 ${mockUserData.userId}님에게만 전달됩니다.`);
    };

    const handleMsgIconClick = () => {
        if (inputRef.current?.value.trim() === "") {
            return; // 입력 값이 없을 시 전송 버튼 비활성화
        }
        console.log(inputRef.current?.value);
        if (inputRef.current) {
            inputRef.current.value = ""; // 전송 버튼 클릭 후 입력 값 초기화
        }
        setIsBottomSheetOpen(false);
    };

    return (
        <UserInfoContainer>
            <UserProfile>
                <UserImg $imgUrl={userImg} />
                <UserDetails>
                    <StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }}>
                        {userId}
                    </StyledText>
                    <Bio>
                        <StyledText $textTheme={{ style: 'body4-light', lineHeight: 1 }} color={theme.colors.gray4}>
                            {truncatedBio}
                        </StyledText>
                    </Bio>
                </UserDetails>
            </UserProfile>
            <ButtonContainer>
                {!isFriend && !isInterested && (
                    <>
                        <Button $backgroundcolor="#000" onClick={handleOpenBottomSheet}>
                            <Icon src={HeartSvg} alt="heart icon" />
                            <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
                                친구 신청
                            </StyledText>
                        </Button>
                        <Button $backgroundcolor="white">
                            <Icon src={StatSvg} alt="star icon" />
                            <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>
                                관심 친구
                            </StyledText>
                        </Button>
                    </>
                )}
                {isFriend && !isInterested && (
                    <>
                        <Button $color="white" $backgroundcolor="#000">
                            <Icon src={MsgSvg} alt="message icon" />
                            <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
                                메세지 보내기
                            </StyledText>
                        </Button>
                        <Button $color="#000" $backgroundcolor="white">
                            <Icon src={StatSvg} alt="star icon" />
                            <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>
                                관심 친구
                            </StyledText>
                        </Button>
                    </>
                )}
                {isFriend && isInterested && (
                    <LongButton>
                        <Icon src={MsgSvg} alt="message icon" />
                        <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
                            메세지 보내기
                        </StyledText>
                    </LongButton>
                )}
                {!isFriend && isInterested && (
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
                    isBackgroundDimmed={true}
                    onCloseBottomSheet={handleCloseBottomSheet}
                    Component={() => (
                        <RequestContainer>
                            <RequestMessage $messageType={messageType}>
                                <StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }} color={theme.colors.gray3}>
                                    {requestMessage}
                                </StyledText>
                            </RequestMessage>
                            <ComentContainer>
                                <Coment 
                                    ref={inputRef}
                                    maxLength={100}
                                    onFocus={handleInputFocus}
                                />
                                <MsgIcon src={MsgSvg} alt="message icon" onClick={handleMsgIconClick} />
                            </ComentContainer>
                        </RequestContainer>
                    )}
                />
            )}
        </UserInfoContainer>
    );
});

export default UserInfo;






