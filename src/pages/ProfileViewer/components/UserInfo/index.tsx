import React from "react";
import { UserDetails, UserInfoContainer, UserProfile, Bio, UserImg, ButtonContainer,Button, LongButton, Icon} from "./styles";
import { UserInfoProps } from "../../dto";
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import HeartSvg from '../../../../assets/heart.svg';
import StatSvg from '../../../../assets/star.svg';
import MsgSvg from '../../../../assets/message_send.svg';

const UserInfo: React.FC<UserInfoProps> = ({userId, userBio, userImg, isFriend, isInterested}) => {
    // 최대 50자로 제한하기
    const truncatedBio = userBio.length > 50 ? userBio.substring(0, 50) + '...' : userBio;

    return (
        <UserInfoContainer>
            <UserProfile>
                <UserImg $imgUrl={userImg}/>
                <UserDetails>
                    <StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }}>
                        {userId}
                    </StyledText>
                    <Bio>
                        <StyledText $textTheme={{ style:'body4-light', lineHeight: 1 }} color={theme.colors.gray4}>
                            {truncatedBio}
                        </StyledText>
                    </Bio>
                </UserDetails>
            </UserProfile>
            <ButtonContainer>
                {!isFriend && !isInterested && (
                    <>
                        <Button $backgroundcolor="#000">
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
                    <LongButton>
                        <Icon src={HeartSvg} alt="heart icon" />
                        <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
                                친구 신청
                        </StyledText>
                    </LongButton>
                )}
            </ButtonContainer>
        </UserInfoContainer>
    );
}

export default UserInfo;

