import React, { useState, useEffect } from "react";
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

const UserInfo: React.FC = React.memo(() => {
    const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useRecoilState(isBottomSheetOpenState);
    const [interested, setInterested] = useState<boolean | undefined>(undefined);
    const [friend, setFriend] = useRecoilState(friendState);

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

                setUserDetails(prevDetails => {
                    if (!prevDetails || prevDetails.isInterested === parsedDetails.isInterested) {
                        return prevDetails;
                    }
                    return {
                        ...prevDetails,
                        isInterested: parsedDetails.isInterested || false,
                    }; // 이전 상태와 비교하여 필요한 경우 상태를 업데이트
                });
            } catch (error) {
                console.error('JSON 파싱 오류:', error);
            }
        }
    }, [id, setUserDetails]);

    const userId = localStorage.getItem('id');

    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
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
                    isBackgroundDimmed={true}
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
        </UserInfoContainer>
    );
});

export default UserInfo;

