import React, { useRef, useState } from 'react';
import request from '../../../../apis/core';
import { ResponseDto } from './ResponseDto';
import { RequestContainer, RequestMessage, Coment, MsgIcon, ComentContainer } from './style';
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import MsgSvg_g from '../../../../assets/ProfileViewer/message_send _gray.svg';
import { RequestComponentProps } from '../../dto';
import { useRecoilState } from 'recoil';
import { friendState } from '../../../../recoil/atoms';

const RequestComponent: React.FC<RequestComponentProps> = ({ userId, nickname, setIsBottomSheetOpen }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [, setFriend] = useRecoilState(friendState);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleMsgIconClick = async () => {
        if (inputValue.trim() === "") {
            return; // 빈 값이 전송되지 않도록
        }

        try {
            const response = await request.post<ResponseDto>(`/user-relationships`, {
                requesterId: Number.parseInt(localStorage.getItem('id') as string),
                targetId: userId,
                message: inputValue
            });

            console.log(response.result);

            // 상태 업데이트 및 UI 변경
            setFriend(true);
            setIsBottomSheetOpen(false);

            // 로컬 스토리지에 저장
            const updatedUserDetails = {
                ...JSON.parse(localStorage.getItem(`userDetails_${userId}`) || '{}'),
                isFriend: true
            };
            localStorage.setItem(`userDetails_${userId}`, JSON.stringify(updatedUserDetails));

            // 입력 필드 초기화
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            setInputValue('');
        } catch (error: any) {
            console.error('친구 신청 오류:', error);

            // 이미 요청한 관계일 때 상태 업데이트
            if (error.response?.data?.message === "이미 요청한 관계입니다.") {
                setFriend(true);
                setIsBottomSheetOpen(false);

                // 로컬 스토리지에 저장
                const updatedUserDetails = {
                    ...JSON.parse(localStorage.getItem(`userDetails_${userId}`) || '{}'),
                    isFriend: true
                };
                localStorage.setItem(`userDetails_${userId}`, JSON.stringify(updatedUserDetails));

                alert('이미 친구 신청을 보냈습니다.');
            } else {
                alert('친구 신청에 실패했습니다.');
            }
        }
    };

    return (
        <RequestContainer>
            <RequestMessage>
                <StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
                    {nickname}님에게 대표 OOTD와 함께 전달될 한 줄 메세지를 보내보세요!
                </StyledText>
            </RequestMessage>
            <ComentContainer>
                <Coment 
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    maxLength={100}
                />
                <MsgIcon src={MsgSvg_g} alt="message icon" onClick={handleMsgIconClick} />
            </ComentContainer>
        </RequestContainer>
    );
};

export default RequestComponent;



