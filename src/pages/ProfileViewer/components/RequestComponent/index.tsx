import React, { useRef, useState, useEffect } from 'react';
import request from '../../../../apis/core';
import { ResponseDto } from './ResponseDto';
import { RequestContainer, RequestMessage, Coment, MsgIcon, ComentContainer } from './style';
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import MsgSvg_g from '../../../../assets/ProfileViewer/message_send _gray.svg';
import { RequestComponentProps } from '../../dto';
import { useRecoilState } from 'recoil';
import { friendState } from '../../../../recoil/atoms';

const RequestComponent: React.FC<RequestComponentProps> = ({ userId, nickname, setIsBottomSheetOpen, handleOpenModal }) => {

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [, setFriend] = useRecoilState(friendState);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setInputValue(textarea.value);
    };

    const handleMsgIconClick = async () => {
        if (inputValue.trim() === "") {
            return;
        }
    
        try {
            const response = await request.post<ResponseDto>(`/user-relationships`, {
                requesterId: Number.parseInt(localStorage.getItem('id') as string),
                targetId: userId,
                message: inputValue
            });
    
            console.log(response.result);
    
            setIsBottomSheetOpen(false);
    
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            setInputValue('');
    
            // 친구 신청 성공 시 모달 띄우기
            handleOpenModal(`${nickname}님에게 대표 OOTD와 한 줄 메세지를 보냈어요!`);
    
        } catch (error: any) {
            console.error('친구 신청 오류:', error);
    
            if (error.response?.data?.message === "이미 요청한 관계입니다.") {
                setFriend(true);
                setIsBottomSheetOpen(false);
                handleOpenModal('이미 친구 신청을 보냈습니다!');
            } else {
                handleOpenModal('친구 신청에 실패했습니다. 다시 시도해 주세요.');
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
                <MsgIcon 
                    src={MsgSvg_g} 
                    alt="message icon" 
                    onClick={handleMsgIconClick} 
                /> 
            </ComentContainer>
        </RequestContainer>
    );
};

export default RequestComponent;







