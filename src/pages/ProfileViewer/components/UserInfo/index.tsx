import React, { useRef, useMemo } from "react";
import axios from "axios";
import { UserDetails, UserInfoContainer, UserProfile, Bio, UserImg, ButtonContainer, Button, LongButton, Icon, RequestContainer, RequestMessage, Coment, MsgIcon, ComentContainer } from "./styles";
import { useRecoilValue, useRecoilState} from 'recoil';
import { userDetailsState, isBottomSheetOpenState, requestMessageState, interestedState, friendState, authTokenState } from '../../../../recoil/atoms';
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import HeartSvg from '../../../../assets/ProfileViewer/heart.svg';
import StatSvg from '../../../../assets/ProfileViewer/star.svg';
import MsgSvg from '../../../../assets/ProfileViewer/message_send.svg';
import MsgSvg_g from '../../../../assets/ProfileViewer/message_send _gray.svg';
import BottomSheet from "../../../../components/BottomSheet";

const UserInfo: React.FC = React.memo(() => {
    const userDetails = useRecoilValue(userDetailsState);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useRecoilState(isBottomSheetOpenState);
    const [requestMessage, setRequestMessage] = useRecoilState(requestMessageState);
    const [interested, setInterested] = useRecoilState(interestedState);
    const [friend, setFriend] = useRecoilState(friendState);
    const authToken = useRecoilValue(authTokenState); // 사용자의 로그인 토큰...
    const inputRef = useRef<HTMLTextAreaElement>(null);

    if (!userDetails) return null; // 사용자의 정보, 즉 userDetails가 없으면 아무것도 렌더링하지 않음

    const { userId, userBio, userImg } = userDetails;
    const truncatedBio = userBio.length > 50 ? userBio.substring(0, 50) + '...' : userBio; // 자기소개 글자 수 제한

    const messageType = useMemo(() => {
        if (requestMessage === `${userId}님에게 대표 OOTD와 함께 전달될 한 줄 메세지를 보내보세요!`) {
            return 'initial';
        }
        return 'comment';
    }, [requestMessage, userId]); // 리렌더링 시 불필요한 계산 방지, userId의 값이 바뀔 때만 messageType을 새롭게 계산! 그렇지 않으면 이전에 계산된 값을 재사용

    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
        setRequestMessage(`${userId}님에게 대표 OOTD와 함께 전달될 한 줄 메세지를 보내보세요!`); // 처음 bottomsheets가 열렸을 때의 문구
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };

    const handleInputFocus = () => {
        setRequestMessage(`${userId}님의 게시물에 대한 코멘트를 남겨보세요. 코멘트는 ${userId}님에게만 전달됩니다.`); // 입력창이 focus 되었을 때 문구
    };

    const handleMsgIconClick = async () => {
        if (inputRef.current?.value.trim() === "") {
            return; // 빈 값이 전송되지 않도록
        }

        try {
            const response = await axios.post('http://localhost:3000/friends/request', 
                {
                    userId,
                    message: inputRef.current?.value.trim()
                },
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`, // 로그인 토큰
                        'Content-Type': 'application/json'
                    }
                }
            ); // 친구 신청 요청을 서버로 전송
            console.log(response);
            if (response.status === 200) {
                setFriend(true);
                setIsBottomSheetOpen(false);
                alert(response.data.message); // 성공 메시지를 알림으로 표시
            }
        } catch (error) {
            console.error("친구 추가 요청 실패:", error);
            alert("친구 추가 요청에 실패했습니다. 다시 시도해주세요.");
        }

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleInterestedClick = () => {
        setInterested(true);
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
                {!friend && !interested && (
                    <>
                        <Button $backgroundcolor="#000" onClick={handleOpenBottomSheet}>
                            <Icon src={HeartSvg} alt="heart icon" />
                            <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
                                친구 신청
                            </StyledText>
                        </Button>
                        <Button $backgroundcolor="white" onClick={handleInterestedClick}> {/*관심 친구 버튼이 눌리면 interest 상태 업데이트 되어 버튼 렌더링 변경*/}
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
                    isBackgroundDimmed={true}
                    onCloseBottomSheet={handleCloseBottomSheet}
                    Component={() => (
                        <RequestContainer>
                            <RequestMessage $messageType={messageType}>
                                <StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
                                    {requestMessage}
                                </StyledText>
                            </RequestMessage>
                            <ComentContainer>
                                <Coment 
                                    ref={inputRef}
                                    maxLength={100}
                                    onFocus={handleInputFocus}
                                />
                                <MsgIcon src={MsgSvg_g} alt="message icon" onClick={handleMsgIconClick} />
                            </ComentContainer>
                        </RequestContainer>
                    )}
                />
            )}
        </UserInfoContainer>
    );
});

export default UserInfo;
