import React, {useRef, useState} from 'react';
import request from '../../../../apis/core';
import { ResponseDto } from './ResponseDto';
import { RequestContainer, RequestMessage, Coment, MsgIcon, ComentContainer } from './style';
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import MsgSvg_g from '../../../../assets/ProfileViewer/message_send _gray.svg';
import { RequestComponentProps } from '../../dto';

const RequestComponent: React.FC<RequestComponentProps> = ({ userId, nickname, setFriend, setIsBottomSheetOpen }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleMsgIconClick = async () => {
        if (inputRef.current?.value.trim() === "") {
            return; // 빈 값이 전송되지 않도록
        }

        try {
            console.log(localStorage.getItem('id')); // 친구 신청을 보내는 id
            console.log(userId); // 친구 신청을 받는 id
            console.log(inputValue);
            const response = await request.post<ResponseDto>(`/user-relationships`, {
                requesterId: 12,
                targetId: 2,
                message: inputValue
            }
        );
    
            console.log(response.result);
            setFriend(true);
            setIsBottomSheetOpen(false);
    
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            setInputValue('');
        } catch (error) {
            console.error('친구 신청 오류:', error);
            alert('친구 신청에 실패했습니다.');
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


