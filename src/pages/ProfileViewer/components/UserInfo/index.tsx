import React from "react";
import axios from "axios";
import { UserDetails, UserInfoContainer, UserProfile, Bio, UserImg, ButtonContainer, Button, LongButton, Icon } from "./styles";
import { useRecoilValue, useRecoilState} from 'recoil';
import { userDetailsState, isBottomSheetOpenState, interestedState, friendState } from '../../../../recoil/atoms';
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import HeartSvg from '../../../../assets/ProfileViewer/heart.svg';
import StatSvg from '../../../../assets/ProfileViewer/star.svg';
import MsgSvg from '../../../../assets/ProfileViewer/message_send.svg';
import RequestComponent from "../RequestComponent";
import BottomSheet from "../../../../components/BottomSheet";

const UserInfo: React.FC = React.memo(() => {
    const userDetails = useRecoilValue(userDetailsState);
    
    
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useRecoilState(isBottomSheetOpenState);
    const [interested, setInterested] = useRecoilState(interestedState);
    const [friend, setFriend] = useRecoilState(friendState);

    if (!userDetails) return null; // 사용자의 정보, 즉 userDetails가 없으면 아무것도 렌더링하지 않음

    const { id, nickname, bio, userImg } = userDetails; // 서버로부터 가져 온 사용자 정보를 꺼내서 사용
    const truncatedBio = (bio && bio.length > 50) ? bio.substring(0, 50) + '...' : bio;

    const userId= localStorage.getItem('id');
    const token = localStorage.getItem('jwt_token');
    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };

    const handleInterestedClick = async () => {
        try {
            console.log(userId,id);
            const response = await axios.patch(`https://api-dev.ootd.today/users/interests`, {
                userId: userId,
                friendId: id,
              },{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
              });        
    
            console.log(response.data.message); // 서버로부터의 응답 메시지
            setInterested(!interested); // 관심친구 상태 토글
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
