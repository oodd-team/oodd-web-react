import React, { useRef, useState } from 'react';
import { RequestContainer, RequestMessage, Coment, MsgIcon, ComentContainer } from './style';
import { StyledText } from "../../../../components/Text/StyledText";
import theme from "../../../../styles/theme";
import MsgSvg_g from '../../../../assets/ProfileViewer/message_send _gray.svg';
import { RequestComponentProps } from '../../dto';

const RequestComponent: React.FC<RequestComponentProps> = ({ userId, $messageType, requestMessage, setFriend, setIsBottomSheetOpen, setRequestMessage }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState('');
    
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputFocus = () => {
        setRequestMessage(`${userId}님의 게시물에 대한 코멘트를 남겨보세요. 코멘트는 ${userId}님에게만 전달됩니다.`);
    };

    const handleMsgIconClick = async () => {
        if (inputRef.current?.value.trim() === "") {
            return; // 빈 값이 전송되지 않도록
        }
        setFriend(true);
        setIsBottomSheetOpen(false);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
        console.log(inputValue);
    };

    return (
        <RequestContainer>
            <RequestMessage $messageType={$messageType}>
                <StyledText $textTheme={{ style: 'body2-light', lineHeight: 1.5 }} color={theme.colors.gray3}>
                    {requestMessage}
                </StyledText>
            </RequestMessage>
            <ComentContainer>
                <Coment 
                    value={inputValue}
                    onChange={handleInputChange}
                    maxLength={100}
                    onFocus={handleInputFocus}
                />
                <MsgIcon src={MsgSvg_g} alt="message icon" onClick={handleMsgIconClick} />
            </ComentContainer>
        </RequestContainer>
    );
};

export default RequestComponent;

